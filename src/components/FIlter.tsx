import { useEffect, useState } from "react";

export type RegionFeature = {
  properties: {
    nom: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

export type FilterProps = {
  onSelectRegion: (region: RegionFeature | null) => void; // Accepte null aussi
};

const Filter = ({ onSelectRegion }: FilterProps) => {
  const [regions, setRegions] = useState<RegionFeature[]>([]);
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/region.geojson")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data.features as RegionFeature[]);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const handleChange = (region: RegionFeature, event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    setSelectedRegionName(isSelected ? region.properties.nom : null);
    onSelectRegion(isSelected ? region : null);
  };
  return (
    <div>
      {regions.map((region, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={`checkbox-${region.properties.nom}`}
            name="region-group" // Utiliser un nom commun pour toutes les checkboxes
            value={region.properties.nom}
            className="cursor-pointer h-3 w-3"
            checked={selectedRegionName === region.properties.nom} // Contrôler la checkbox avec l'état
            onChange={(e) => handleChange(region, e)} // Passer à la nouvelle fonction handleChange
          />
          <label htmlFor={`checkbox-${region.properties.nom}`} className="cursor-pointer ml-1 text-xs text-white">
            {region.properties.nom}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
