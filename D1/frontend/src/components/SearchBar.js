import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="usernames/projects"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export { SearchBar };
