import styled from "styled-components";

export const Container = styled.div`
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
