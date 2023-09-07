import React from "react";
import {
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  LoanTypeSelection,
  LoanTypeNewComponent,
  LoanTypeSecondHandComponent,
} from "../components";
import "../styles/loantypes.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const LoanTypeComponent = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const SelectLoanTypeHandler = (args) => {
    navigate(`/vehicle-loan/loan-type/${args}`, { replace: true });
  };

  return (
    <div className="loan-type--main">
      <TopbarComponent />
      <CustomHeader title="Vehicle Loan" />
      <div className="prev-btn">
        <CustomPrevBtn />
      </div>
      <div className="loan-type--body">
        <div className="selection-card">
          <LoanTypeSelection
            defaultType={type}
            HandleLoanType={SelectLoanTypeHandler}
          />
        </div>
        {type === "new" ? (
          <LoanTypeNewComponent />
        ) : type === "second-hand" ? (
          <LoanTypeSecondHandComponent />
        ) : type === "refinance" ? (
          <LoanTypeSecondHandComponent />
        ) : (
          <Navigate to={"/not-found"} />
        )}
      </div>
    </div>
  );
};

export default LoanTypeComponent;
