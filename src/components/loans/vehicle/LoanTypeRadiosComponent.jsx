import React, { useEffect, useState } from "react";
import "../../../styles/loantyperadios.css";

const LoanTypeRadiosComponent = (props) => {
  const { LoanTypeHandler, styles } = props;
  const [radioValue, setRadioValue] = useState(props.defaultVal);

  useEffect(() => {
    LoanTypeHandler(props.defaultVal);
  }, []);

  const loanTypes = [
    {
      text: "New",
      value: "new",
    },
    {
      text: "Second Hand",
      value: "second-hand",
    },
    {
      text: "Refinance",
      value: "refinance",
    },
  ];

  const SelectLoanType = (e) => {
    setRadioValue(e.target.value);

    LoanTypeHandler(e.target.value);
  };

  const RadioInputHandler = () => {
    return loanTypes.map((type, index) => {
      return (
        <div key={index} className="type">
          <input
            type="radio"
            id="html"
            name="loan-type"
            checked={radioValue === type.value}
            value={type.value}
            onChange={SelectLoanType}
            className={`loan-type-circle`}
          />
          <p className="value">{type.text}</p>
        </div>
      );
    });
  };

  return (
    <div className="loan-type-selection--radios">
      <RadioInputHandler />
    </div>
  );
};

export default LoanTypeRadiosComponent;