import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Image = styled.div`
  flex: 1 1 0;

  img {
    display: block;
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  div {
    margin-top: 1rem;
    display: flex;

    button {
      flex: 1 1 0;

      &:not(:first-child) {
        margin-left: 1rem;
      }
    }
  }
`;

export const Infos = styled.div`
  flex: 1 1 0;
  margin-left: 2.5rem;
  padding-top: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    color: hsl(211, 39%, 23%);
  }
`;

export const ParticipantsText = styled.p`
  font-size: 1.2rem;
  color: hsl(209, 23%, 60%);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 1rem;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1rem;

  svg {
    width: 2.5rem;

    .primary {
      fill: hsl(209, 23%, 60%);
    }

    .secondary {
      fill: hsl(211, 39%, 23%);
    }
  }

  span {
    font-size: 1.4rem;
    color: hsl(209, 28%, 39%);
    font-weight: 600;
    margin-left: 1rem;
  }
`;

export const Description = styled.p`
  margin-top: 2rem;
  font-size: 1.6rem;
  color: hsl(209, 28%, 39%);
`;

export const Participants = styled.div`
  padding: 2rem;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: hsl(211, 39%, 23%);
    margin: 2rem 0;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 1.8rem;
      color: hsl(209, 34%, 30%);
    }
  }
`;
