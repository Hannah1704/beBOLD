import React from "react";

function Project({ project }) {
  return (
    <li>
      <strong>{project.name}</strong> <br />
      Participants: {project.participants.join(", ")} <br />
      Date: {project.date} <br />
      Popularity: {project.popularity} | Downloads: {project.downloads}
    </li>
  );
}

export { Project };
