import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDefaultGuideImage, setModalDefaultGuideImage] = useState("");

  const openModal = (requirementTitle, defaultGuideImage) => {
    setModalTitle(requirementTitle);
    setModalDefaultGuideImage(defaultGuideImage);
    setModalOpen(true);
  };

  const closeModal = () => {
    // TODO: Handle image when closing modal
    setModalDefaultGuideImage(null);
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        modalTitle,
        modalDefaultGuideImage,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};