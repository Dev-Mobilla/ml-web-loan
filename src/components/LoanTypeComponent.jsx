import React, {useEffect, useMemo, useState} from 'react';
import { 
    TopbarComponent,
    CustomHeader,
    CustomPrevBtn,
    LoanTypeSelection,
    FooterComponent,
    LoanTypeNewComponent,
    LoanTypeSecondHandComponent
} from '../components';
import "../styles/loantype.css";
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import {LoanTypeSecondHand} from '../pages';

const LoanTypeComponent = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  // const [ selectedType, setSelectedType ] = useState();

  const SelectLoanTypeHandler = (args) => {
    console.log('ARGS', args);
    navigate(`/vehicle-loan/loan-type/${args}`, { replace: true });
  }

  return (
    <div className="loan-type--main">
        <TopbarComponent />
        <CustomHeader title="Vehicle Loan" />
        <div className="prev-btn">
          <CustomPrevBtn />
        </div>
        <div className="loan-type--body">
            <div className="selection-card">
              <LoanTypeSelection defaultType={type} HandleLoanType={SelectLoanTypeHandler}/>
            </div>
        {
          type === "new" ? 

            <LoanTypeNewComponent/> 

          : type === "second-hand" ? 

          // <h1>second hand</h1> 
          <LoanTypeSecondHandComponent/>

          : type === "refinance" ? 

            <h1>refinance</h1> 

          : <Navigate to={'/not-found'}/>
        }
        </div>
    </div>
  )
}

export default LoanTypeComponent;