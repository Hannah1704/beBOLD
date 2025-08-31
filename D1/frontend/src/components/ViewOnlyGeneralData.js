import React from "react";
import { users } from "../data";

function ViewOnlyGeneralData({ userId, currentUserId }) {
  const user = users.find((u) => u.id === userId);
  if (!user) return <p>User not found</p>;

  const currentUser = users.find((u) => u.id === currentUserId);
  const isFriend = currentUser?.friends.includes(userId);

  return (
    <div>
      <div style={{ width: 100, height: 100, borderRadius: "50%", backgroundColor: "#cea0a0ff", marginBottom: 10 }}></div>

      <p><strong>Username / Email:</strong> {user.username}</p>
      <p><strong>Pronouns:</strong> {user.pronouns}</p>
      <p><strong>Birthday:</strong> {user.birthday}</p>
      <p><strong>Work:</strong> {user.work}</p>
      <p><strong>Contact:</strong> {user.contact}</p>

      {userId === currentUserId ? (
        <p>This is you</p>
      ) : isFriend ? (
        <p style={{ color: "pink" }}>You are friends</p>
      ) : (
        <button onClick={() => alert(`Friend request sent to ${user.username}`)}>Add Friend</button>
      )}
    </div>
  );
}

export { ViewOnlyGeneralData };
