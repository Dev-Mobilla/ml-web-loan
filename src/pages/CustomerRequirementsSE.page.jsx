import React from "react";
import { CustomerRequirementsSEComponent } from "../components";
import { ModalProvider } from "../utils/modalContext";

const CustomerRequirementsSE = () => {
  return (
    <ModalProvider>
      <CustomerRequirementsSEComponent />
    </ModalProvider>
  );
};

export default CustomerRequirementsSE;
