import { useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/Searchbar";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Map searchQuery={searchQuery} />
    </div>
  );
};

export default App;
