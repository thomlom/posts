import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import {
  FormButton,
  FormError,
  FormInput,
  FormTitle,
  Label,
  Input,
} from "./shared.styles";

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const history = useHistory();
  const { signin } = useAuth();
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useReducer(
    (s: FormData, a: Partial<FormData>) => ({ ...s, ...a }),
    {
      email: "",
      password: "",
    }
  );

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ [e.target.name]: e.target.value });
  }

  async function submitSignForm(e: React.FormEvent<HTMLFormElement>) {
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
};

export default Signin;
