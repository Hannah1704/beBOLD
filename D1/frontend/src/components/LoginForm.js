import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onSwitchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if(!form.email.includes("@")) 
    {
      newErrors.email = "Email must contain @";
    }
    if(form.password.length < 6) 
    {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if(validate()) 
  {
    try 
    {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (data.success) 
      {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } 
      else 
      {
        setErrors({ form: "Login failed" });
      }
    } 
   catch(err) 
    {
      setErrors({ form: "Server error" });
    }
  }
};


  return (
    <main>
      <h1>be BOLD.</h1>
      <h2>Jump Back</h2>
      <p>
        Welcome to where productivity reaches new heights. Be beyond, be bold,
        be you. Tools that allow you to manage your Projects and Profile with
        ease and efficiency. Like your standard version control websites but
        with an edge. Join us and be bold today!
      </p>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email/Username:
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <br />
        {/* ------------------------------------------------------------ */}
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <br />
        {/* ------------------------------------------------------------ */}
        <button type="submit">Login</button>
      </form>

      
      <p>
        New to BOLD? Join the movement:{" "}
        <button type="button" onClick={onSwitchToRegister}>
          Register
        </button>
      </p>
    </main>
  );
}

export { LoginForm };
