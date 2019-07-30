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

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        try {
          await signin(formData);
          closeDialog();
        } catch (e) {
          setError(e.response.data.message);
        }
      }}
    >
      <FormTitle>Hello again.</FormTitle>
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
