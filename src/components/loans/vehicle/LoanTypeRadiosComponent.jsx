import React, {useState} from 'react';
import "../../../styles/loantyperadios.css";

const LoanTypeRadiosComponent = (props) => {

  const { LoanTypeHandler, styles } = props;
  const [isSelected, setIsSelected] = useState();
  
  const loanTypes = [
    {
      text: "New",
      value: "new"
    },
    {
      text: "Second Hand",
      value: "second-hand"
    },
    {
      text: "Refinance",
      value: "refinance"
    }
  ]

  const SelectLoanType = (e) => {
    LoanTypeHandler(e.target.value);
    setIsSelected(e.target.checked);
  }

  const isCheckHandler = () => {
    return isSelected ? "selected" : "";
  }

  return (
    <div className="loan-type-selection--radios">
      
      {
        loanTypes.map((type, index) => {
          return (
            <div key={index} className='type'>
              <input 
                type="radio" 
                id="html"
                name="loan-type" 
                value={type.value} onChange={SelectLoanType} 
                className={`loan-type-circle ${isCheckHandler}`}/>
              <span className='value'>{type.text}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default LoanTypeRadiosComponent;