import React from "react";

import IconClose from "./IconClose";
import { StyledDialog } from "./CustomDialog.styles";

const CustomDialog = ({ children, onDismiss, ...rest }) => {
  return (
    <StyledDialog onDismiss={onDismiss} {...rest}>
      <IconClose onClick={onDismiss} />
      {children}
    </StyledDialog>
  );
};

export default CustomDialog;
