import React, { useState, useContext, createContext } from "react";

const DialogContext = createContext();

function DialogProvider(props) {
  const [isOpen, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <DialogContext.Provider
      value={{ isOpen, openDialog, closeDialog }}
      {...props}
    />
  );
}

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
