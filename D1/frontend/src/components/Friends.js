import React, { useState } from "react";
import { users } from "../data";
import { ViewOnlyGeneralData } from "./ViewOnlyGeneralData";

function Friends({ userId }) {
  const user = users.find((u) => u.id === userId);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  if(!user) return <p>User not found</p>;

  const friendsList = user.friends
    .map((friendId) => users.find((u) => u.id === friendId))
    .filter(Boolean);
  
  // PREVIEW
  if(selectedFriendId) 
  {
    return (
      <div>
        <button onClick={() => setSelectedFriendId(null)}>Back to Friends</button>
        <ViewOnlyGeneralData userId={selectedFriendId} currentUserId={userId} />
      </div>
    );
  }

  return (
    <div>
      <h2>{user.username}'s Friends</h2>
      {friendsList.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {friendsList.map((friend) => (
            <li
              key={friend.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedFriendId(friend.id)}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#c79f9fff",
                  marginRight: "10px",
                }}
              ></div>
              <span>{friend.username}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Friends };
