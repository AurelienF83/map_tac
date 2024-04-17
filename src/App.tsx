import { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/Searchbar";
import Filter, { RegionFeature } from "./components/FIlter";
import Card from "./components/Card";

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
    <div className="min-h-screen bg-black">
      {" "}
      {/* Background sur toute la page */}
      <div className="mx-auto max-w-screen-xl">
        {" "}
        {/* Centre le contenu et applique une largeur max */}
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-0">
          {" "}
          {/* Stack verticalement sur mobile, horizontalement sur desktop */}
          <div className="w-full md:w-48 mt-2 md:mr-2">
            {" "}
            {/* Responsive width and padding */}
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
            <Filter onSelectRegion={handleSelectRegion} onSelectStatus={handleSelectStatus} />
          </div>
          <div className="mt-2 py-2 px-2 flex-grow border border-border rounded-lg bg-background">
            {" "}
            {/* Responsive padding */}
            <Map searchQuery={searchQuery} selectedRegion={selectedRegion} selectedStatus={selectedStatus} />
          </div>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default App;
