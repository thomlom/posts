import styled, { css } from "styled-components";

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  img {
    width: 100%;
    max-width: 30rem;
  }

  p {
    color: hsl(209, 34%, 30%);
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
  }
`;

export const Button = styled.button`
  font-size: var(--text-lg);
  font-weight: 700;
  padding: var(--m-3) var(--m-4);
  border: none;
  border-radius: var(--small-radius);
  box-shadow: var(--shadow-small);
  background-color: var(--grey-800);
  color: var(--grey-100);
  cursor: pointer;
`;

export const FormButton = styled(Button)`
  width: 100%;
  margin-top: var(--m-4);
`;

export const FormError = styled.p`
  font-size: var(--text-base);
  font-weight: 700;
  text-align: center;
  padding: var(--m-3);
  border-radius: var(--small-radius);
  color: hsl(352, 90%, 35%);
  background-color: hsl(360, 100%, 95%);
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;

  label + * {
    margin-top: var(--m-2);
  }

  &:not(:first-of-type) {
    margin-top: var(--m-4);
  }

  span {
    color: var(--grey-700);
    margin-top: var(--m-2);
    font-weight: 500;
    font-size: var(--text-sm);
  }
`;

export const FormTitle = styled.h2`
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--grey-800);
  margin: var(--m-4) 0;
  text-align: center;
`;

export const Label = styled.label`
  text-transform: uppercase;
  color: var(--grey-700);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const baseInput = css`
  box-sizing: border-box;
  border: 1px solid var(--grey-400);
  border-radius: var(--small-radius);
  padding: var(--m-3) var(--m-4);
  width: 100%;

  font-size: var(--text-base);
  color: var(--grey-700);

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }
`;

export const Input = styled.input`
  ${baseInput}
`;

export const Textarea = styled.textarea`
  ${baseInput}

  resize: none;
`;
