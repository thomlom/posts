import styled from "styled-components";

export const Container = styled.div``;

export const Image = styled.div`
  position: relative;

  img {
    display: block;
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: var(--small-radius);
    box-shadow: var(--shadow-medium);
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
`;

export const Infos = styled.div`
  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: var(--m-3) 0;

    span:first-of-type {
      font-size: var(--text-4xl);
      font-weight: 800;
      color: var(--grey-800);
    }

    span:last-of-type {
      font-size: var(--text-lg);
      color: var(--grey-600);
    }
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  margin-top: var(--m-2);

  svg {
    width: 30px;

    .primary {
      fill: var(--grey-500);
    }

    .secondary {
      fill: var(--grey-800);
    }
  }

  span {
    font-size: var(--text-base);
    color: var(--grey-700);
    font-weight: 500;
    margin-left: var(--m-2);
  }
`;

export const Content = styled.p`
  margin-top: var(--m-6);
  font-size: var(--text-base);
  color: var(--grey-700);
  font-weight: 500;
`;
