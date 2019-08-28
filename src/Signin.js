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

function Signin({ signin, closeDialog }) {
  const [error, setError] = useState("");
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

  async function submitSignForm(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Password and email are required.");
      return;
    }

    try {
      await signin(formData);
      closeDialog();
    } catch ({ response: { data } }) {
      setError(data);
    }
  }

  return (
    <Form onSubmit={submitSignForm}>
      <FormTitle>Hello again.</FormTitle>
      {error && <FormError>{error}</FormError>}
      <FormInput>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
        />
      </FormInput>
      <FormInput>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
        />
      </FormInput>
      <FormButton type="submit">Sign In</FormButton>
    </Form>
  );
}

export default Signin;
