import React, { useState } from "react";

function Signin({ signin, closeDialog }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        signin(formData);
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
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleFormChange}
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Signin;
