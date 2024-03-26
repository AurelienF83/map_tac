import React from "react";

type FilterProps = {
  regions: string[];
  selectedRegions: string[];
  onRegionChange: (region: string) => void;
  onZoomToRegion: (region: string) => void; // Ajout de la nouvelle prop
};

const Filter: React.FC<FilterProps> = ({ regions, selectedRegions, onRegionChange, onZoomToRegion }) => {
  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regionName = event.target.value;
    onRegionChange(regionName);
    if (event.target.checked) {
      onZoomToRegion(regionName); // Appeler le zoom lorsque la checkbox est cochée
    }
  };

  return (
    <div>
      {regions.map((region) => (
        <div key={region}>
          <input
            type="checkbox"
            id={region}
            value={region}
            checked={selectedRegions.includes(region)}
            onChange={handleRegionChange}
          />
          <label htmlFor={region}>{region}</label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
