import React, { useState } from "react";

function Signup({ signup, closeDialog }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        signup(formData);
        closeDialog();
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleFormChange}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleFormChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
