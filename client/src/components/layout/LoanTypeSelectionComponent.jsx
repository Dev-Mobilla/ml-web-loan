import React from "react";

import "../../styles/selection.css";
import { CustomCardTitle, LoanTypeRadiosComponent } from "../index";

const LoanTypeSelection = (props) => {
  const { HandleLoanType, defaultType } = props;

  const OnselectedTypeHandler = (loanType) => {
    HandleLoanType(loanType);
  };

  return (
    <div className="loan-type">
      <CustomCardTitle title="Loan Type" styles="custom-card-title" />
      <LoanTypeRadiosComponent
        LoanTypeHandler={OnselectedTypeHandler}
        styles="loan-type-circle"
        defaultVal={defaultType}
      />
    </div>
  );
};

export default LoanTypeSelection;
