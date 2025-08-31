import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
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
    if(form.password !== form.confirm) 
    {
      newErrors.confirm = "Passwords do not match";
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if(data.success) 
      {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } 
      else 
      {
        setErrors({ form: "Registration failed" });
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
      <h2>Get started</h2>
      <p>
        Welcome to where productivity reaches new heights. Be beyond, be bold,
        be you. Tools that allow you to manage your Projects. You make the
        moves, we help you reach your goals: efficiently and with spunk. Why be
        boring? be BOLD now!
      </p>
      <h2>Register</h2>
      <h3>Run with it</h3>
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

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            required
          />
        </label>
        {errors.confirm && <p style={{ color: "red" }}>{errors.confirm}</p>}
        <br />

        <button type="submit">Begin your BeBold journey</button>
      </form>
      <p>
        Already BOLD?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </main>
  );
}

export { RegisterForm };
