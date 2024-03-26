import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RegionFeature } from "./Filter";

type Location = {
  lat: number;
  lng: number;
  name: string;
  date: string;
  ps: string;
};

type MapProps = {
  searchQuery: string;
  selectedRegion?: RegionFeature | null; // Ajouté pour la région sélectionnée
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

  // Affichage des localisations en fonction de searchQuery
  useEffect(() => {
    if (mapRef.current) {
      const filteredLocations = searchQuery
        ? locations.filter(
            (location) =>
              location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.ps.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.date.includes(searchQuery)
          )
        : locations;

      filteredLocations.forEach((location) => {
        L.marker([location.lat, location.lng]).addTo(mapRef.current as L.Map).bindPopup(`
            <div>
              <h4>${location.name}</h4>
              <p>Coordonnées : ${location.lat}, ${location.lng}</p>
              <p>Poste Source : ${location.ps}</p>
              <p>Date de Mise en Service : ${location.date}</p>
            </div>
          `);
      });
    }
  }, [locations, searchQuery]);

  // Ajustement de la vue de la carte pour la région sélectionnée
  useEffect(() => {
    // Vérifiez que mapRef.current n'est pas null avant d'utiliser
    if (selectedRegion && mapRef.current) {
      const mapInstance = mapRef.current as L.Map; // Casting explicite
      const geoJsonLayer = L.geoJSON(selectedRegion.geometry, {
        style: {
          color: "#ff7800",
          weight: 5,
          opacity: 0.65,
        },
      }).addTo(mapInstance);
      mapInstance.fitBounds(geoJsonLayer.getBounds());
    }
  }, [selectedRegion]);

  return <div id="map" style={{ height: "650px", width: "100%" }} />;
}

export default Map;
