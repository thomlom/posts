import styled from "styled-components";

export const PostCard = styled.li`
  display: flex;
  flex-direction: column;
  background-color: var(--grey-200);
  border-radius: var(--small-radius);
  box-shadow: var(--shadow-medium);
  cursor: pointer;
  position: relative;

  &:not(:first-of-type) {
    margin-top: var(--m-5);
  }

  span {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: var(--grey-200);
    color: var(--grey-700);
    padding: 0.75rem;
    border-radius: var(--small-radius);
    font-size: var(--text-sm);
    font-weight: 700;
  }

  img {
    display: block;
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-top-left-radius: var(--small-radius);
    border-top-right-radius: var(--small-radius);
  }

  svg {
    background-color: var(--grey-200);
    border-radius: var(--small-radius);
    padding: 0.25rem;
    position: absolute;
    top: 5px;
    right: 5px;
    height: 30px;
    width: 30px;

    .primary {
      fill: var(--grey-600);
    }

    .secondary {
      fill: var(--grey-800);
    }
  }

  div {
    padding: var(--m-3);

    h2 {
      margin: var(--m-2) 0;
      color: var(--grey-800);
      font-size: var(--text-2xl);
      font-weight: 800;
    }

    p {
      margin: var(--m-2) 0;
      font-size: var(--text-lg);
      color: var(--grey-600);
      font-weight: 500;
    }
  }
`;

export const NoPosts = styled.div`
  margin-top: var(--m-5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
  }

  p {
    color: var(--grey-700);
    font-size: var(--text-2xl);
    font-weight: 700;
    margin-top: var(--m-5);
  }
`;
