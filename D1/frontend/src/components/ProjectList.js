import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { localFeedData } from "../data";

function ProjectList() {
  const [projects, setProjects] = useState(localFeedData);
  const [filterTag, setFilterTag] = useState(null);

  const handleHashtagClick = (tag) => {
    setFilterTag(tag);
  };

  const filteredProjects = filterTag
    ? projects.filter(proj => proj.hashtags.includes(filterTag))
    : projects;

  return (
    <div>
      {filterTag && (
        <div style={{ marginBottom: 10 }}>
          <span>Filtering by: {filterTag}</span>
          <button onClick={() => setFilterTag(null)} style={{ marginLeft: 10 }}>Clear Filter</button>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        filteredProjects.map(proj => (
          <ProjectCard key={proj.id} project={proj} onHashtagClick={handleHashtagClick} />
        ))
      ) : (
        <p>No projects found for this hashtag.</p>
      )}
    </div>
  );
}

export { ProjectList };
