import React, {useState} from 'react';
import { 
    TopbarComponent,
    CustomHeader,
    CustomPrevBtn,
    LoanTypeSelection
} from '../components';
import "../styles/loantype.css";
import {useParams} from 'react-router-dom';

const LoanTypeComponent = () => {
  const { type } = useParams();

  const [ selectedType, setSelectedType ] = useState();

  const SelectLoanTypeHandler = (args) => {
    console.log('ARGS', args);
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

        </div>
    </div>
  )
}

export default LoanTypeComponent;