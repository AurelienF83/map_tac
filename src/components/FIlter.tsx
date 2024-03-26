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
  onSelectRegion: (region: RegionFeature) => void;
};

const Filter: React.FC<FilterProps> = ({ onSelectRegion }) => {
  const [regions, setRegions] = useState<RegionFeature[]>([]);

  useEffect(() => {
    fetch("/region.geojson")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data.features as RegionFeature[]);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);
  const handleSelectRegion = (region: RegionFeature) => {
    onSelectRegion(region);
  };

  return (
    <div>
      {regions.map((region, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={`checkbox-${region.properties.nom}`}
            name={region.properties.nom}
            value={region.properties.nom}
            className="cursor-pointer h-3 w-3"
            onClick={() => handleSelectRegion(region)}
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
