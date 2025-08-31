import React, { useState } from "react";

const projectTypes = [
  "Desktop Application",
  "Web Application",
  "Mobile Application",
  "Framework",
  "Library",
  "Other"
];

function CreateProjectForm({ currentUserId, onCreateProject }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(projectTypes[0]);
  const [hashtags, setHashtags] = useState([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [files, setFiles] = useState([]);


  const [errors, setErrors] = useState({});

  // *******************************************************************************
  // HASHTAG 
  const addHashtag = () => {
    if(newHashtag.trim() !== "" && !hashtags.includes(newHashtag.trim())) 
    {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  // *******************************************************************************
  // IMAGE 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file && file.size<= 5 * 1024 * 1024) 
    {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } 
    else 
    {
      alert("Max size is 5MB.");
    }
  };

  // *******************************************************************************
  // FILES
  const handleFilesChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  // *******************************************************************************
  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if(!name.trim() || name.trim().length < 3) 
    {
      newErrors.name = "Project name must be at least 3 characters.";
    }

    if(!description.trim() || description.trim().length < 10) 
    {
      newErrors.description = "Description must be at least 10 characters.";
    }

    const versionRegex = /^\d+\.\d+\.\d+$/;
    if(!versionRegex.test(version)) 
    {
      newErrors.version = "Version must follow the format X.Y.Z (e.g., 1.0.0).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  // *******************************************************************************
  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateForm()) 
    {
      return; 
    }

    const newProject = {
      id: Date.now(), 
      owner: currentUserId,
      name,
      description,
      type,
      hashtags,
      version,
      image: imagePreview, 
      files,
      participants: [currentUserId],
      members: [currentUserId],
      activity: [],
      date: new Date().toLocaleDateString(),
      popularity: 0,
      downloads: 0,
    };

    console.log("New Project Created:", newProject);

    if(onCreateProject) 
    {
      onCreateProject(newProject);
    }

    // RESET
    setName("");
    setDescription("");
    setType(projectTypes[0]);
    setHashtags([]);
    setVersion("1.0.0");
    setImage(null);
    setImagePreview(null);
    setFiles([]);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20 }}
    >
      <h2>Create New Project</h2>

      {/* ******************************************* */}
      {/* NAME */}
      <label>
        Project Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {errors.name && <p style={{ color:"red" }}>{errors.name}</p>}
      <br />
      <br />

      {/* ******************************************* */}
      {/* DESC */}
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
      <br />
      <br />

      {/* ******************************************* */}
      {/* TYPE */}
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {projectTypes.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />

      {/* ******************************************* */}
      {/* HASHTAGS */}
      <label>
        Hashtags:
        <div>
          {hashtags.map((tag, i) => (
            <span key={i} style={{ marginRight: 5, color: "blue" }}>
              #{tag}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={newHashtag}
          onChange={(e) => setNewHashtag(e.target.value)}
          placeholder="Add a hashtag"
        />
        <button type="button" onClick={addHashtag}>
          Add Hashtag
        </button>
      </label>
      <br />
      <br />

      {/* ******************************************* */}
      {/* VERSION */}
      <label>
        Version:
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </label>
      {errors.version && <p style={{ color: "red" }}>{errors.version}</p>}
      <br />
      <br />

      {/* ******************************************* */}
      {/* IMAGE */}
      <label>
        Project Image (Max 5MB):
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="preview"
          style={{ width: 100, height: 100 }}
        />
      )}
      <br />
      <br />

      {/* ******************************************* */}
      {/* FILES */}
      <label>
        Add Files:
        <input type="file" multiple onChange={handleFilesChange} />
      </label>
      {files.length > 0 && <p>{files.length} file(s) selected</p>}
      <br />
      <br />

      {/* ******************************************* */}
      {/* SUBMIT */}
      <button type="submit">Create Project</button>
    </form>
  );
}

export { CreateProjectForm };
