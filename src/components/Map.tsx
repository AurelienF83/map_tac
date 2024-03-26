import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RegionFeature } from "./Filter"; // Assurez-vous que le chemin d'import est correct

type Location = {
  lat: number;
  lng: number;
  name: string;
  date: string;
  ps: string;
};

type MapProps = {
  searchQuery: string;
  selectedRegion?: RegionFeature | null;
};

function Map({ searchQuery, selectedRegion }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  // Initialisation de la carte et récupération des localisations
  useEffect(() => {
    if (!mapRef.current && document.getElementById("map")) {
      mapRef.current = L.map("map").setView([46.8, 2.2], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    fetch("http://127.0.0.1:5000/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Gestion de l'affichage des localisations et de la recherche
  useEffect(() => {
    if (mapRef.current) {
      // Suppression des marqueurs existants
      mapRef.current!.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current!.removeLayer(layer);
        }
      });

      // Fonction pour gérer les coordonnées doublées
      const coordsUsed: { [key: string]: number } = {};

      const filteredLocations = searchQuery
        ? locations.filter(
            (location) =>
              location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.ps.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.date.includes(searchQuery)
          )
        : locations;

      filteredLocations.forEach((location) => {
        let { lat, lng } = location;
        const { name, date, ps } = location;
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
          <div>
            <h4>${name}</h4>
            <p>Coordonnées : ${lat}, ${lng}</p>
            <p>Poste Source : ${ps}</p>
            <p>Date de Mise en Service : ${date}</p>
          </div>
        `);
      });
    }
  }, [locations, searchQuery]);

  // Ajustement de la vue de la carte pour la région sélectionnée
  useEffect(() => {
    if (selectedRegion && mapRef.current) {
      const geoJsonLayer = L.geoJSON(selectedRegion.geometry, {
        style: {
          color: "#000",
          weight: 0.6,
          fillOpacity: 0.1,
        },
      }).addTo(mapRef.current);
      mapRef.current.fitBounds(geoJsonLayer.getBounds());
    }
  }, [selectedRegion]);

  return <div id="map" style={{ height: "650px", width: "100%" }} />;
}

export default Map;
