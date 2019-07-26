import React, { useState } from "react";

import {
  Form,
  FormTitle,
  FormInput,
  FormButton,
  Label,
  Input,
} from "./shared.styles";

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
    <Form
      onSubmit={e => {
        e.preventDefault();
        signin(formData);
        closeDialog();
      }}
    >
      <FormTitle>Hello again.</FormTitle>
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
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
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
