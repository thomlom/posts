import styled from "styled-components";

export const EventListContainer = styled.div`
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

export const Title = styled.h2`
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: hsl(210, 22%, 49%);

  span {
    color: hsl(211, 39%, 23%);
  }
`;

export const EventGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const EventCard = styled.li`
  display: flex;
  flex-direction: column;
  background-color: hsl(210, 36%, 96%);
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;

  span {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: hsl(210, 36%, 96%);
    color: hsl(209, 34%, 30%);
    padding: 0.75rem;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 700;
  }

  h2 {
    margin: 0.5rem;
    color: hsl(211, 39%, 23%);
    font-size: 1.8rem;
    font-weight: 700;
  }

  img {
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  svg {
    background-color: hsl(210, 36%, 96%);
    border-radius: 5px;
    padding: 0.25rem;
    position: absolute;
    top: 5px;
    right: 5px;
    height: 3rem;
    width: 3rem;

    .primary {
      fill: hsl(210, 22%, 49%);
    }

    .secondary {
      fill: hsl(209, 34%, 30%);
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0.75rem;
  }
`;
