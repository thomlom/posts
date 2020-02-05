import React from "react";
import styled from "styled-components";

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

const IconMenu: React.FC<Props> = ({ onClick }) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon-menu"
      onClick={onClick}
    >
      <path
        className="secondary"
        fillRule="evenodd"
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
      />
    </Icon>
  );
};

export default IconMenu;
