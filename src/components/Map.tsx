import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  lat: number;
  lng: number;
  name: string;
  date: string;
  ps: string;
};

type MapProps = {
  searchQuery: string;
};

function Map({ searchQuery }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    const mapInstance = mapRef.current ? L.map(mapRef.current).setView([46.8, 2.2], 6) : null;

    if (mapInstance) {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      const coordsUsed: { [key: string]: number } = {};

      // Filtre de recherche (name, ps, date)
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

        // Fonction offset
        const key = `${lat}-${lng}`;

        if (coordsUsed[key]) {
          const offset = 0.0004 * coordsUsed[key];
          lat += offset;
          lng += offset;
          coordsUsed[key] += 1;
        } else {
          coordsUsed[key] = 1;
        }

        const popupContent = `
          <div class="custom-popup">
            <h4>${name}</h4>
            <p>Coordonnées : ${lat}, ${lng}</p>
            <p>Poste Source : ${ps}</p>
            <p>Date de Mise en Service : ${date}</p>
          </div>
        `;

        L.marker([lat, lng]).addTo(mapInstance).bindPopup(popupContent);
      });

      return () => {
        mapInstance.remove();
      };
    }
  }, [locations, searchQuery]);

  return <div id="map" style={{ height: "650px", width: "100%" }} ref={mapRef} />;
}

export default Map;
