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
  onSelectRegion: (region: RegionFeature | null) => void; // Accepte null
  onSelectStatus: (status: string | null) => void; // Nouvelle prop pour gérer le status
};

const status = ["Réalisée", "Reportée", "À venir"]; // Les status possibles

const Filter = ({ onSelectRegion, onSelectStatus }: FilterProps) => {
  const [regions, setRegions] = useState<RegionFeature[]>([]);
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch("/region.geojson")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data.features as RegionFeature[]);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const handleRegionChange = (region: RegionFeature, event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    setSelectedRegionName(isSelected ? region.properties.nom : null);
    onSelectRegion(isSelected ? region : null);
  };

  const handleStatusChange = (status: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    setSelectedStatus(isSelected ? status : null);
    onSelectStatus(isSelected ? status : null);
  };
  return (
    <div>
      <div className="mb-4 py-1 px-1 bg-background rounded-md">
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
              onChange={(e) => handleRegionChange(region, e)}
            />
            <label
              htmlFor={`checkbox-${region.properties.nom}`}
              className="w-48 cursor-pointer ml-1 text-xs text-white hover:bg-slate-700"
            >
              {region.properties.nom}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-4 py-1 px-1 bg-background rounded-lg border border-border">
        <h1 className="text-white mb-2">Status</h1>
        {status.map((status, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`checkbox-status-${status}`}
              name="status-group"
              className="cursor-pointer h-3 w-3"
              checked={selectedStatus === status}
              onChange={(e) => handleStatusChange(status, e)}
            />
            <label
              htmlFor={`checkbox-status-${status}`}
              className="w-48 cursor-pointer ml-1 text-xs text-white hover:bg-slate-700"
            >
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
