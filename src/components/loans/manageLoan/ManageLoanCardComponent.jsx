import React from 'react';
import CustomButton from '../../custom/Custom.button';

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
    btnType
 }) => {
  return (
    <div className={loanCardName}>
        <div className={cardContainer}>
            <div className="icon-content">
                <div className="hlmng-icon">
                    <div className="overlap-4">
                    {
                        icon
                    }
                    </div>
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
            />
        </div>
    </div>
  )
}

export default ManageLoanCardComponent;