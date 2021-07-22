import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        firstOpen,
        setFirstOpen,
        secondOpen,
        setSecondOpen
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;
