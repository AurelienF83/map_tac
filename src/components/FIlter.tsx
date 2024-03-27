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
      <h1 className="text-white mb-2">Région</h1>
      {regions.map((region, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            type="checkbox"
            id={`checkbox-${region.properties.nom}`}
            name="region-group"
            value={region.properties.nom}
            className="cursor-pointer h-3 w-3"
            checked={selectedRegionName === region.properties.nom}
            onChange={(e) => handleChange(region, e)}
          />
          <label
            htmlFor={`checkbox-${region.properties.nom}`}
            className="w-48  cursor-pointer ml-1 text-xs text-white hover:bg-slate-700"
          >
            {region.properties.nom}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
