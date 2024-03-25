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
    <div className="">
      <form onSubmit={handleSubmit} className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
        <input
          type="text"
          className="px-4 py-2 w-80 lg:w-96 text-gray-700 leading-tight focus:outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="flex items-center justify-center px-4 border-l bg-gray-700 text-white">
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
