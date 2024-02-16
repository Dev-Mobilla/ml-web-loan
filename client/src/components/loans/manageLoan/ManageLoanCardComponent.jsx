import React from "react";
import CustomButton from "../../custom/Custom.button";

const ManageLoanCardComponent = ({
  loanType,
  referenceNo,
  icon,
  btnName,
  btnStyle,
  loanCardName,
  cardContainer,
  loantypeTxt,
  referenceTxt,
  OnBtnClick,
  btnType,
  disabled,
  componentKey
}) => {
  return (
    <div className={loanCardName} key={componentKey}>
      <div className={cardContainer}>
        <div className="icon-content">
          <div className="loan-type-wrapper">
            <div className="hlmng-icon" key={componentKey}>
              <div className="overlap-4">{icon}</div>
            </div>
            <div className="details-overlap-3">
              <div className={loantypeTxt}>{loanType}</div>
              <div className={referenceTxt}>Ref. no. {referenceNo}</div>
            </div>
          </div>
          <CustomButton
            name={btnName}
            styles={btnStyle}
            EventHandler={OnBtnClick}
            btnType={btnType}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageLoanCardComponent;
