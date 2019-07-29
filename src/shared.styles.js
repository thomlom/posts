import styled from "styled-components";

export const Button = styled.button`
  font-size: ${props => (props.small ? "1.2rem" : "1.4rem")};
  font-weight: 700;
  padding: ${props => (props.small ? "0.5rem 1rem" : "0.75rem 1.25rem")};
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: ${props =>
    props.secondary ? "hsl(210, 36%, 96%)" : "hsl(209, 34%, 30%);"};
  color: ${props =>
    props.secondary ? "hsl(209, 34%, 30%)" : "hsl(210, 36%, 96%)"};
  cursor: pointer;
`;

export const Form = styled.form`
  input,
  textarea {
    margin-top: 0.8rem;
  }
`;

export const FormTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: hsl(211, 39%, 23%);
  margin: 2rem 0;
  text-align: center;
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

export const Label = styled.label`
  text-transform: uppercase;
  color: hsl(209, 34%, 30%);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid hsl(212, 33%, 89%);
  border-radius: 5px;
  padding: 1rem 2rem;
  width: 100%;
  line-height: 1.5;

  font-size: 1.6rem;
  color: hsl(209, 34%, 30%);

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Textarea = styled.textarea`
  box-sizing: border-box;
  border: 1px solid hsl(212, 33%, 89%);
  border-radius: 5px;
  padding: 1rem 2rem;
  width: 100%;
  line-height: 1.5;

  font-size: 1.6rem;
  color: hsl(209, 34%, 30%);

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }
`;

export const FormButton = styled.button`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  color: hsl(210, 36%, 96%);
  background-color: hsl(209, 34%, 30%);
  margin: 2rem 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;
