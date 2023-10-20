import React from "react";
import { CustomerRequirementComponent } from "../components";
import { ModalProvider } from "../utils/modalContext";

const CustomerRequirements = () => {
  return (
    <ModalProvider>
      <CustomerRequirementComponent />
    </ModalProvider>
  );
};

export default CustomerRequirements;
