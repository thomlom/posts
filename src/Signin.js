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

function Signin({ history }) {
  const { signin } = useAuth();
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useReducer((s, a) => ({ ...s, ...a }), {
    email: "",
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
      await signin(formData);
      history.push("/");
    } catch ({ response: { data } }) {
      setError(data);
    }
  }

  return (
    <form onSubmit={submitSignForm}>
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
    </form>
  );
}

export default Signin;
