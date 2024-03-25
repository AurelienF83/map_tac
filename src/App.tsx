import { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/Searchbar";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-slate-700">
      <div className="flex justify-center py-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex justify-center m-2">
        <Map searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default App;
