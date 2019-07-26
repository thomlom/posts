import React, { useState } from "react";

import {
  Form,
  FormTitle,
  FormInput,
  FormButton,
  Label,
  Input,
} from "./shared.styles";

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
    <Form
      onSubmit={e => {
        e.preventDefault();
        signup(formData);
        closeDialog();
      }}
    >
      <FormTitle>Welcome!</FormTitle>
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
