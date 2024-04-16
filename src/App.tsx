import { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/Searchbar";
import Filter, { RegionFeature } from "./components/FIlter";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [selectedRegion, setSelectedRegion] = useState<RegionFeature | null>(null);
  const handleSelectRegion = (region: RegionFeature | null) => {
    setSelectedRegion(region);
  };

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const handleSelectStatus = (status: string | null) => {
    setSelectedStatus(status);
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      <div className="w-48">
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <Filter onSelectRegion={handleSelectRegion} onSelectStatus={handleSelectStatus} />
      </div>
      <div className="flex-grow">
        <Map searchQuery={searchQuery} selectedRegion={selectedRegion} selectedStatus={selectedStatus} />
      </div>
    </div>
  );
};

export default App;
