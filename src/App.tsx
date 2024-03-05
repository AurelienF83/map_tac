import { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define a type for the coordinates as a tuple of two strings
type CoordinateTuple = [string, string];

// Define a type for a location with numeric latitude and longitude
type Location = {
  lat: number;
  lng: number;
};

const App = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Initialize the state with an empty array of Location type
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Fetch the location data from the backend
    fetch("http://127.0.0.1:5000/locations")
      .then((response) => response.json())
      .then((data: CoordinateTuple[]) => {
        // Map over the data and convert each tuple of strings into a Location object
        const loadedLocations: Location[] = data.map(([lat, lng]) => ({
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        }));
        // Update the state with the converted locations
        setLocations(loadedLocations);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([44.5, 5.2], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add a marker to the map for each location
      locations.forEach(({ lat, lng }) => {
        L.marker([lat, lng]).addTo(map);
      });

      return () => {
        map.remove();
      };
    }
  }, [locations]); // This effect will re-run when `locations` state updates

  return <div id="map" style={{ height: "700px", width: "100%" }} ref={mapRef} />;
};

export default App;
