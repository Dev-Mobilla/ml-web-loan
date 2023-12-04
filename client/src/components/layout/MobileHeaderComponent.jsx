import "../../styles/header.css";
import React, { useState } from 'react';
import CustomButton from "../custom/Custom.button";

const MobileHeaderComponent = ({manageLoansEvent}) => {

  return (
   <div className="mobile-header">
        <div className="manage-loan--btn">
            <CustomButton
            name={'Manage Existing Loans'}
            styles={'manage-loan-btn'}
            icon={false}
            btnType={'button'}
            EventHandler={manageLoansEvent}
            />
        </div>
        <hr className="mobile-header--line"/>
   </div>
  )
}

export default MobileHeaderComponent;
