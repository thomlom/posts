import styled from "styled-components";
import { Dialog } from "@reach/dialog";

import "@reach/dialog/styles.css";

export const StyledDialog = styled(Dialog)`
  border-radius: 5px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: 15vh auto;
  background-color: hsl(210, 36%, 96%);

  @media (max-width: 768px) {
    width: 75vw;
  }

  position: relative;

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;
