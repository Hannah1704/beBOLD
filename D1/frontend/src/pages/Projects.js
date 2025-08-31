import React, { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { CreateProjectForm } from "../components/CreateProjectForm";
import { localFeedData } from "../data";

function Projects() {
  // STATE
  const [projects, setProjects] = useState(localFeedData);

  // FILTER - HASH
  const [filterTag, setFilterTag] = useState(null);

  // DUMMY - CURRENT 
  const currentUserId = 1;

  // IF HASH IS CLICKED 
  const handleHashtagClick = (tag) => {
    setFilterTag(tag);
  };

  // ADD: FORM 
  const handleCreateProject = (newProject) => {
    setProjects([newProject, ...projects]); 
    setFilterTag(null); 
  };

  // EDIT
  const handleUpdateProject = (updatedProject) => {
    setProjects(prevProjects =>
      prevProjects.map(proj =>
        proj.id ===updatedProject.id ? updatedProject : proj
      )
    );
  };

  // DELETE
  const handleDeleteProject = (projectId) => {
    setProjects(prevProjects =>
      prevProjects.filter(proj => proj.id !== projectId)
    );
  };

  // FILTER WITH TAG
  const filteredProjects = filterTag
    ? projects.filter(proj => proj.hashtags && proj.hashtags.includes(filterTag))
    : projects;

  return (
    <div>
      <h1>Project Pages</h1>

      <CreateProjectForm currentUserId={currentUserId} onCreateProject={handleCreateProject} />
      {/* ------------------------------------------------------------------------- */}
      {filterTag && (
        <div style={{ marginBottom: 10 }}>
          <span>Filtering by: {filterTag}</span>
          <button onClick={() => setFilterTag(null)} style={{ marginLeft: 10 }}>Clear Filter</button>
        </div>
      )}
      {/* ------------------------------------------------------------------------- */}
      {filteredProjects.length > 0 ? (
        filteredProjects.map(proj => (
          <ProjectCard
            key={proj.id}
            project={proj}
            currentUserId={currentUserId}
            onHashtagClick={handleHashtagClick}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default Projects;
