import React from "react";
import { RouteComponentProps } from "react-router-dom";

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
  name: string;
}

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const { signup } = useAuth();
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useReducer(
    (s: FormData, a: Partial<FormData>) => ({ ...s, ...a }),
    {
      email: "",
      name: "",
      password: "",
    }
  );

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ [e.target.name]: e.target.value });
  }

  async function submitSignForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setError("Password, email and name are required.");
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
};

export default Signup;
