import React, { useEffect, useMemo, useState } from "react";
import {
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  LoanTypeSelection,
  FooterComponent,
} from "../components";
import "../styles/loantype.css";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const LoanTypeComponent = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  let params = new URLSearchParams(search);
  // useEffect(() => {

  //   console.log(params.get("loantype"));
  //   setUrlQueryParams(params.get("loantype"));
  // },[])

  // const [ selectedType, setSelectedType ] = useState();

  const SelectLoanTypeHandler = (args) => {
    console.log("ARGS", args);
    navigate(`/vehicle-loan/loan-type?loantype=${args}`);
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
            defaultType={params.get("loantype")}
            HandleLoanType={SelectLoanTypeHandler}
          />
        </div>
      </div>
      <Outlet />
      {/* <FooterComponent/> */}
    </div>
  );
};

export default LoanTypeComponent;
