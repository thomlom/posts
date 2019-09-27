import React from "react";

import { useAuth } from "./AuthProvider";
import {
  FormButton,
  FormError,
  FormInput,
  FormTitle,
  Label,
  Input,
} from "./shared.styles";

function Signup({ history }) {
  const { signup } = useAuth();
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useReducer((s, a) => ({ ...s, ...a }), {
    email: "",
    name: "",
    password: "",
  });

  function handleFormChange(e) {
    setFormData({ [e.target.name]: e.target.value });
  }

  async function submitSignForm(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Password and email are required.");
      return;
    }

    try {
      await signup(formData);
      history.push("/");
    } catch ({ response: { data } }) {
      setError(data);
    }
  }

  return (
    <form onSubmit={submitSignForm}>
      <FormTitle>Welcome.</FormTitle>
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
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
      <FormButton type="submit">Sign Up</FormButton>
    </form>
  );
}

export default Signup;
