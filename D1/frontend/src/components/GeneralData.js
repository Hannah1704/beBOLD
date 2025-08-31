import React, { useState } from "react";
import { users } from "../data";

function GeneralData({ userId }) {
  const user = users.find((u) => u.id === userId);
  if(!user) return <p>User not found</p>;

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [pronouns, setPronouns] = useState(user.pronouns);
  const [birthday, setBirthday] = useState(user.birthday);
  const [work, setWork] = useState(user.work);
  const [contact, setContact] = useState(user.contact);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log("Saved data:", { username, password, pronouns, birthday, work, contact });
    setIsEditing(false);
  };

  return (
    <div>
      <div style={{ width: 100, height: 100, borderRadius: "50%", backgroundColor: "#cdadadff", marginBottom: 10 }}></div>

      <label><strong>Username / Email:</strong></label>
      {isEditing ? <input value={username} onChange={(e) => setUsername(e.target.value)} /> : <p>{username}</p>}

      <label><strong>Password:</strong></label>
      {isEditing ? <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> : <p>{"*".repeat(password.length)}</p>}

      <label><strong>Pronouns:</strong></label>
      {isEditing ? <input value={pronouns} onChange={(e) => setPronouns(e.target.value)} /> : <p>{pronouns}</p>}

      <label><strong>Birthday:</strong></label>
      {isEditing ? <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} /> : <p>{birthday}</p>}

      <label><strong>Work:</strong></label>
      {isEditing ? <input value={work} onChange={(e) => setWork(e.target.value)} /> : <p>{work}</p>}

      <label><strong>Contact:</strong></label>
      {isEditing ? <input value={contact} onChange={(e) => setContact(e.target.value)} /> : <p>{contact}</p>}

      {isEditing ? <button onClick={handleSave}>Save</button> : <button onClick={() => setIsEditing(true)}>Edit</button>}
    </div>
  );
}

export { GeneralData };
