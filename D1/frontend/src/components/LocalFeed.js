import React from "react";
import { Project } from "./Project";
import { users } from "../data";

function LocalFeed({ projects }) {
  return (
    <ul>
      {projects.map((proj) => {
        const participantNames = proj.participants
          .map((id) => users.find((u) => u.id === id)?.username)
          .filter(Boolean);

        return <Project key={proj.id} project={{ ...proj, participants: participantNames }} />;
      })}
    </ul>
  );
}

export { LocalFeed };
