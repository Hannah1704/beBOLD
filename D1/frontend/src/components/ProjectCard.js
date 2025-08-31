import React, { useState } from "react";
import { users } from "../data";

function ProjectCard({ project, currentUserId, onUpdateProject, onDeleteProject }) {

  // STATE
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [type, setType] = useState(project.type);
  const [imagePreview, setImagePreview] = useState(project.image);

  const [members, setMembers] = useState(project.participants);
  const [files, setFiles] = useState(project.files || []);
  const [discussion, setDiscussion] = useState(project.discussion || []);
  const [newComment, setNewComment] = useState("");

  const currentUser = users.find((u) => u.id === currentUserId);
  const isOwner = currentUserId === project.owner;

  const projectTypes = [
    "Desktop Application",
    "Web Application",
    "Mobile Application",
    "Framework",
    "Library",
  ];
  // --------------------------------------------------------------------------
  // EDIT
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file && file.size <= 5 * 1024 * 1024) setImagePreview(URL.createObjectURL(file));
    else alert("Max size 5MB.");
  };

  const handleSave = () => {
    const updatedProject = {
      ...project,
      name,
      description,
      type,
      image: imagePreview,
      participants: members,
      files,
      discussion,
    };
    onUpdateProject(updatedProject);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete project "${project.name}"?`)) onDeleteProject(project.id);
  };

// --------------------------------------------------------------------------
  // MEMERS
  const addMember = (friendId) => {
    if(!members.includes(friendId)) setMembers([...members, friendId]);
  };

  const removeMember = (memberId) => {
    if (memberId === project.owner) alert("Cannot remove owner. Use relinquish ownership.");
    else setMembers(members.filter((id) => id !== memberId));
  };

  const relinquishOwnership = (newOwnerId) => {
    if (!members.includes(newOwnerId)) alert("New owner must be a member.");
    else onUpdateProject({ ...project, owner: newOwnerId, participants: members });
  };
  
// --------------------------------------------------------------------------
  // FILES
    const addFiles = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles.map(f => f.name)]);
    };


  const removeFile = (fileName) => {
    setFiles(files.filter(f => f.name !== fileName));
  };

// --------------------------------------------------------------------------
  // COMMENTS
  const addComment = () => {
    if (newComment.trim() === "") return;
    setDiscussion([...discussion, { userId: currentUserId, text: newComment }]);
    setNewComment("");
  };

// --------------------------------------------------------------------------
  // FINAL RENDER
  return (
    <div style={{ border: "1px solid #d2acacff", padding: 20, marginBottom: 20 }}>
      
      {/* ------------------------------ */}
      {/* IMAGE */}
      {imagePreview && <img src={imagePreview} alt="project" style={{ width: 100, height: 100 }} />}

      {/* ------------------------------ */}
      {/* NAME AND TYPE */}
      {isEditing ? (
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {projectTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>
        </div>
      ) : (
        <h3>{project.name} ({project.type})</h3>
      )}

      {/* ------------------------------ */}
      {/* DESCRIPTION */}
      {isEditing ? (
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      ) : (
        <p>{description}</p>
      )}

      {/* ------------------------------ */}
      {/* HASHTAGS */}
      <p>{project.hashtags?.map((tag, i) => <span key={i} style={{ marginRight: 5, color: "blue" }}>#{tag}</span>)}</p>

      {/* ------------------------------ */}
      {/* MEMBERS */}
      <p><strong>Members:</strong> {members.map(id => users.find(u => u.id === id)?.username).join(", ")}</p>

      {/* ------------------------------ */}
      {/* FILES */}
        <div>
        <strong>Files:</strong>
        <ul>
            {files.map((f, i) => (
            <li key={i}>
                {typeof f === "string" ? f : f.name} 
                {members.includes(currentUserId) && (
                <button onClick={() => removeFile(typeof f === "string" ? f : f.name)}>
                    Remove
                </button>
                )}
            </li>
            ))}
        </ul>
        {members.includes(currentUserId) && (
            <input type="file" multiple onChange={addFiles} />
        )}
        </div>


      {/* ------------------------------ */}
      {/* DISCUSSION */}
      <div>
        <strong>Discussion:</strong>
        <ul>
          {discussion.map((c, i) => (
            <li key={i}><b>{users.find(u => u.id === c.userId)?.username}:</b> {c.text}</li>
          ))}
        </ul>
        {members.includes(currentUserId) && (
          <div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={addComment}>Post</button>
          </div>
        )}
      </div>

      {/* ------------------------------ */}
      {/* OWNER STUFF */}
      {isOwner && (
        <div>
          {isEditing ? <button onClick={handleSave}>Save</button> : <button onClick={() => setIsEditing(true)}>Edit Project</button>}
          <button onClick={handleDelete} style={{ color: "red" }}>Delete Project</button>

          {/* REMOVE */}
          {members.filter(id => id !== currentUserId).map(id => (
            <div key={id}>
              {users.find(u => u.id === id)?.username}
              <button onClick={() => removeMember(id)}>Remove</button>
            </div>
          ))}

          {/* OWNERSHIP */}
          {members.filter(id => id !== currentUserId).length > 0 && (
            <div>
              <label>Relinquish ownership to:</label>
              <select onChange={(e) => relinquishOwnership(Number(e.target.value))} defaultValue="">
                <option value="" disabled>Select member</option>
                {members.filter(id => id !== currentUserId).map(id => (
                  <option key={id} value={id}>{users.find(u => u.id === id)?.username}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* ADD MEMBER */}
      {members.includes(currentUserId) && (
        <div>
          <label>Add member:</label>
          <select onChange={(e) => addMember(Number(e.target.value))} defaultValue="">
            <option value="" disabled>Select friend</option>
            {currentUser.friends.filter(fId => !members.includes(fId)).map(fId => (
              <option key={fId} value={fId}>
                {users.find(u => u.id === fId)?.username}
              </option>
            ))}
          </select>
        </div>
      )}



    </div>
  );
}

export { ProjectCard };
