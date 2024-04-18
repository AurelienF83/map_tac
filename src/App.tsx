import { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/Searchbar";
import Filter, { RegionFeature } from "./components/FIlter";
import CardsContainer from "./components/Card"; // Assurez-vous que ce chemin est correct et que CardsContainer est bien le nom du composant

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<RegionFeature | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState({ total: 0, réalisée: 0, àVenir: 0, reportée: 0 });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectRegion = (region: RegionFeature | null) => {
    setSelectedRegion(region);
  };

  const handleSelectStatus = (status: string | null) => {
    setSelectedStatus(status);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-4">
          <CardsContainer statusCounts={statusCounts} />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-48 mr-2">
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
            <Filter onSelectRegion={handleSelectRegion} onSelectStatus={handleSelectStatus} />
          </div>
          <div className="flex-grow px-2 py-2 mt-0 md:mt-0 border border-border rounded-lg bg-background">
            <Map
              searchQuery={searchQuery}
              selectedRegion={selectedRegion}
              selectedStatus={selectedStatus}
              setStatusCounts={setStatusCounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
