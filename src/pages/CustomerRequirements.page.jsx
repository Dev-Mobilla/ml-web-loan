import React from "react";
import { CustomerRequirementsComponent } from "../components";
import { ModalProvider } from "../utils/modalContext";

const CustomerRequirements = () => {
  return (
    <ModalProvider>
      <CustomerRequirementsComponent />
    </ModalProvider>
  );
};

export default CustomerRequirements;
