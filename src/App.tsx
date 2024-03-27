import { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/Searchbar";
import Filter, { RegionFeature } from "./components/Filter";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [selectedRegion, setSelectedRegion] = useState<RegionFeature | null>(null);
  const handleSelectRegion = (region: RegionFeature | null) => {
    setSelectedRegion(region);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="w-48">
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <Filter onSelectRegion={handleSelectRegion} />
      </div>
      <div className="flex-grow">
        <Map searchQuery={searchQuery} selectedRegion={selectedRegion} />
      </div>
    </div>
  );
};

export default App;
