import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [rotateFirstOpen, setRotateFirstOpen] = useState("");
  const [rotateSecondOpen, setRotateSecondOpen] = useState("");
  return (
    <ModalContext.Provider
      value={{
        rotateFirstOpen,
        setRotateFirstOpen,
        rotateSecondOpen,
        setRotateSecondOpen
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;
