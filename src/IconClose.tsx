import React from "react";
import styled from "styled-components";

import VisuallyHidden from "@reach/visually-hidden";

const Icon = styled.svg`
  width: 4rem;
  height: 4rem;
  cursor: pointer;

  .secondary {
    fill: hsl(209, 34%, 30%);
  }
`;

interface Props {
  onClick: () => void;
}

const IconClose: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <VisuallyHidden>Close</VisuallyHidden>
      <Icon
        xmlns="http://www.w3.org/2000/Icon"
        viewBox="0 0 24 24"
        className="icon-close"
        data-testid="close"
        onClick={onClick}
        aria-hidden
      >
        <path
          className="secondary"
          fillRule="evenodd"
          d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
        />
      </Icon>
    </>
  );
};

export default IconClose;
