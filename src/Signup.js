import React, { useState } from "react";

import {
  Form,
  FormButton,
  FormError,
  FormInput,
  FormTitle,
  Label,
  Input,
} from "./shared.styles";

function Signup({ signup, closeDialog }) {
  const [error, setError] = useState("");
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

  async function submitSignForm(e) {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setError("Password, email and name are required.");
      return;
    }

    try {
      await signup(formData);
      closeDialog();
    } catch ({ response: { data } }) {
      setError(data);
    }
  }

  return (
    <Form onSubmit={submitSignForm}>
      <FormTitle>Welcome!</FormTitle>
      {error && <FormError>{error}</FormError>}
      <FormInput>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
        />
      </FormInput>
      <FormInput>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
        />
      </FormInput>
      <FormInput>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
        />
      </FormInput>
      <FormButton type="submit">Sign Up</FormButton>
    </Form>
  );
}

export default Signup;
