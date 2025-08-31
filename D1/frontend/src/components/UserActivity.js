import React from "react";
import { localFeedData, globalFeedData, users } from "../data";

function UserActivity({ userId }) {
  const user = users.find((u) => u.id === userId);
  if (!user) return <p>User not found</p>;

  // MY PROJECTS AND ACTIVITY
  const allProjects = [...localFeedData, ...globalFeedData];
  const userProjects = allProjects.filter(
    (proj) => proj.owner === userId || proj.participants.includes(userId)
  );

  return (
    <div>
      <h2>{user.username}'s Projects</h2>
      {userProjects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <ul>
          {userProjects.map((proj) => {
            const ownerName = users.find((u) => u.id === proj.owner)?.username || "Unknown";
            const participantNames = proj.participants
              .map((id) => users.find((u) => u.id === id)?.username)
              .filter(Boolean);

            return (
              <li key={proj.id}>
                <strong>{proj.name}</strong> <br />
                Owner: {ownerName} <br />
                Participants: {participantNames.join(", ")} <br />
                Date: {proj.date} <br />
                Popularity: {proj.popularity} | Downloads: {proj.downloads}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { UserActivity };
