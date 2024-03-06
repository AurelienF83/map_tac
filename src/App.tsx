import { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  lat: number;
  lng: number;
  name: string;
  date: number;
  ps: string;
};

const App = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/locations")
      .then((response) => response.json())
      .then((data: Location[]) => {
        setLocations(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([46.5, 2.2], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Un objet pour suivre les coordonnées déjà utilisées
      const coordsUsed: { [key: string]: number } = {};

      locations.forEach(({ lat, lng, name, date, ps }) => {
        // Créer une clé unique pour la latitude et longitude
        const key = `${lat}-${lng}`;
        // Vérifier si les coordonnées sont déjà utilisées
        if (coordsUsed[key]) {
          // Ajuster légèrement les coordonnées si nécessaire
          const offset = 0.0004 * coordsUsed[key]; // ajustement de 0.0001 pour chaque marqueur superposé
          lat += offset;
          lng += offset;
          coordsUsed[key] += 1;
        } else {
          // Sinon, enregistrer la latitude et la longitude utilisées
          coordsUsed[key] = 1;
        }

        const popupContent = `
        <div class="custom-popup">
          <h4>${name}</h4>
          <p>Coordonnées : ${lat}, ${lng}</p>
          <p>Poste Source : ${ps}</p>
          <p>Date de Mise en Service : ${date} </p>
        </div>
      `;

        L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
      });

      return () => {
        map.remove();
      };
    }
  }, [locations]);

  return <div id="map" style={{ height: "700px", width: "100%" }} ref={mapRef} />;
};

export default App;
