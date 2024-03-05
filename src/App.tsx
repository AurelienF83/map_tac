import { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  lat: number;
  lng: number;
  name: string; // Ajoutez cette propriété pour le nom du parc
};

const App = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/locations")
      .then((response) => response.json())
      .then((data: Location[]) => {
        setLocations(data); // Since data is already in the correct format, you can set it directly
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

      locations.forEach(({ lat, lng, name }) => {
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

        // Ajouter le marqueur avec les coordonnées potentiellement ajustées
        L.marker([lat, lng]).addTo(map).bindPopup(name);
      });

      return () => {
        map.remove();
      };
    }
  }, [locations]);

  return <div id="map" style={{ height: "700px", width: "100%" }} ref={mapRef} />;
};

export default App;
