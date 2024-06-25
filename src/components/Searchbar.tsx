import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

function SearchBar({ onSearch, placeholder = "Recherche..." }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-col w-full md:w-48">
      <form onSubmit={handleSubmit} className="flex border-2 border-border rounded-md overflow-hidden">
        <input
          type="text"
          className=" bg-background px-1 py-2 w-full text-card-foreground font-normal leading-tight focus:outline-none flex-grow text-xs"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center px-3 bg-background text-primary hover:bg-accent"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
