import React, { useState } from "react";
import { LocalFeed } from "../components/LocalFeed";
import { GlobalFeed } from "../components/GlobalFeed";
import { SearchBar } from "../components/SearchBar";
import { SortPanel } from "../components/SortPanel";
import { users, localFeedData, globalFeedData } from "../data";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOptions, setSortOptions] = useState({
    order: "asc",
    criteria: { popularity: false, downloads: false },
    feeds: { local: true, global: true },
  });

  // ----------------------------------------------------
  // FILTER
  const filterProjects = (projects) => {
    if(!searchTerm) return projects;
    return projects.filter((proj) => {
      const projectNameMatch = proj.name.toLowerCase().includes(searchTerm.toLowerCase());
      const participantNames = proj.participants
        .map((id) => users.find((u) => u.id === id)?.username || "")
        .join(" ")
        .toLowerCase();
      const userMatch = participantNames.includes(searchTerm.toLowerCase());
      return projectNameMatch || userMatch;
    });
  };

  // ----------------------------------------------------
  // SORT
  const sortProjects = (projects) => {
    let sorted = [...projects];

    // POP AND DOWN
    if(sortOptions.criteria.popularity) 
    {
      sorted.sort((a, b) => a.popularity - b.popularity);
    }
    if(sortOptions.criteria.downloads)
    {
      sorted.sort((a, b) => a.downloads - b.downloads);
    }

    // DEFAULT (NAME)
    if (!sortOptions.criteria.popularity && !sortOptions.criteria.downloads) 
    {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    // DESC
    if(sortOptions.order ==="desc") 
    {
      sorted.reverse();
    }

    return sorted;
  };

  return (
    <div>
      <h2>Search</h2>
      <SearchBar onSearch={setSearchTerm} />

      <h2>Sort Options</h2>
      <SortPanel onSortChange={setSortOptions} />

      {sortOptions.feeds.local && (
        <>
          <h2>Local Feed</h2>
          <LocalFeed projects={sortProjects(filterProjects(localFeedData))} />
        </>
      )}

      {sortOptions.feeds.global && (
        <>
          <h2>Global Feed</h2>
          <GlobalFeed projects={sortProjects(filterProjects(globalFeedData))} />
        </>
      )}
    </div>
  );
}

export default Home;
