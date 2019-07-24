import React, { useState, useContext, createContext } from "react";

const DialogContext = createContext();

function DialogProvider({ children }) {
  const [isOpen, setOpen] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
