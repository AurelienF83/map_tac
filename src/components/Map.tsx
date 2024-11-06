import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RegionFeature } from "./FIlter";

type Location = {
  lat: number;
  lng: number;
  name: string;
  date: string;
  ps: string;
  status: string;
};

type StatusCounts = {
  total: number;
  réalisée: number;
  àVenir: number;
  reportée: number;
  inconnu: number;
};

type MapProps = {
  searchQuery: string;
  selectedRegion?: RegionFeature | null;
  selectedStatus?: string | null; // Ajout du statut sélectionné
  setStatusCounts: (counts: StatusCounts) => void; // Nouvelle prop pour mettre à jour les comptes
};

function Map({ searchQuery, selectedRegion, selectedStatus, setStatusCounts }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  // Définition de la fonction normalizeStatus
  function normalizeStatus(status: string): string {
    return status
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  // Initialisation de la carte et récupération des localisations
  useEffect(() => {
    if (!mapRef.current && document.getElementById("map")) {
      mapRef.current = L.map("map").setView([46.8, 2.2], 6);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    fetch("https://raw.githubusercontent.com/AurelienF83/json/main/datajson")
      // fetch("http://127.0.0.1:5000/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Gestion de l'affichage des localisations et de la recherche
  useEffect(() => {
    if (mapRef.current) {
      // Suppression des marqueurs existants
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current!.removeLayer(layer);
        }
      });

      // Calcul des comptes avec normalisation des statuts
      const counts: StatusCounts = {
        total: locations.length,
        réalisée: 0,
        àVenir: 0,
        reportée: 0,
        inconnu: 0,
      };

      locations.forEach((loc) => {
        const status = normalizeStatus(loc.status);
        if (status === "realisee") {
          counts.réalisée += 1;
        } else if (status === "a venir") {
          counts.àVenir += 1;
        } else if (status === "reportee") {
          counts.reportée += 1;
        } else {
          counts.inconnu += 1;
          console.log(`Statut inconnu trouvé: "${loc.status}" après normalisation: "${status}"`);
        }
      });

      console.log("Total:", counts.total);
      console.log("Réalisée:", counts.réalisée);
      console.log("À venir:", counts.àVenir);
      console.log("Reportée:", counts.reportée);
      console.log("Inconnu:", counts.inconnu);

      setStatusCounts(counts);

      // Fonction Recherche
      let filteredLocations = searchQuery
        ? locations.filter(
            (location) =>
              location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.ps.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.date.includes(searchQuery)
          )
        : locations;

      // Normaliser le statut sélectionné
      const normalizedSelectedStatus = selectedStatus ? normalizeStatus(selectedStatus) : null;

      // Filtrer par statut si sélectionné
      if (normalizedSelectedStatus) {
        filteredLocations = filteredLocations.filter(
          (location) => normalizeStatus(location.status) === normalizedSelectedStatus
        );
      }

      // Fonction Offset
      const coordsUsed: { [key: string]: number } = {};
      filteredLocations.forEach((location) => {
        let { lat, lng } = location;
        const { name, date, ps, status } = location;
        const key = `${lat}-${lng}`;

        if (coordsUsed[key]) {
          const offset = 0.0004 * coordsUsed[key];
          lat += offset;
          lng += offset;
          coordsUsed[key] += 1;
        } else {
          coordsUsed[key] = 1;
        }

        L.marker([lat, lng]).addTo(mapRef.current as L.Map).bindPopup(`
          <div class="custom-popup">
            <h4>${name}</h4>
            <p>Coordonnées GPS : ${lat}, ${lng}</p>
            <p>Poste Source : ${ps}</p>
            <p>Date de Mise en Service : ${date}</p>
            <p>État : ${status}</p>
          </div>
          `);
      });
    }
  }, [locations, searchQuery, selectedStatus]);

  // Ajustement de la vue de la carte pour la région sélectionnée
  useEffect(() => {
    if (selectedRegion && mapRef.current) {
      if (geoJsonLayerRef.current) {
        mapRef.current.removeLayer(geoJsonLayerRef.current);
      }

      const geoJsonLayer = L.geoJSON(selectedRegion.geometry, {
        style: {
          color: "#000",
          weight: 0.6,
          fillOpacity: 0.1,
        },
      }).addTo(mapRef.current);
      mapRef.current.fitBounds(geoJsonLayer.getBounds());
      geoJsonLayerRef.current = geoJsonLayer;
    }
  }, [selectedRegion]);

  return <div id="map" style={{ height: "650px", width: "100%", borderRadius: "6px" }} />;
}

export default Map;
