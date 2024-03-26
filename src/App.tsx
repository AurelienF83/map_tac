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
    <div className="min-h-screen bg-slate-700">
      <div className="flex justify-center py-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex">
        <div className="w-48">
          <Filter onSelectRegion={handleSelectRegion} />
        </div>
        <div className="flex-grow">
          <Map searchQuery={searchQuery} selectedRegion={selectedRegion} />
        </div>
      </div>
    </div>
  );
};

export default App;
