import React from 'react';
import "../styles/otpcomponent.css";
import CustomCardTitle from './custom/Custom.cardTitle';
import CustomInputField from './custom/Custom.inputfield';
import CustomButton from './custom/Custom.button';

const OTPModalComponent = ({ time }) => {
  return (
    <div className='otp-component'>
        <div className="otp-modal--overlay">
            <div className="otp-modal--wrapper">
                <div className="otp-modal--container">
                    <div className="otp-modal--title">
                        <CustomCardTitle title="One Time Pin" styles="custom-title"/>
                    </div>
                    <div className="otp-modal--sub-title">
                        <p>We've sent a 6-digit code to your device.</p>
                        <p>Please enter the code.</p>
                    </div>
                    <div className="otp-modal--input">
                        <CustomInputField
                        inputType={"text"}
                        inputStyle="custom-input"/>
                        <CustomInputField
                        inputType={"text"}
                        inputStyle="custom-input"/>
                        <CustomInputField
                        inputType={"text"}
                        inputStyle="custom-input"/>
                        <CustomInputField
                        inputType={"text"}
                        inputStyle="custom-input"/>
                        <CustomInputField
                        inputType={"text"}
                        inputStyle="custom-input"/>
                        <CustomInputField
                        inputType={"text"}
                        inputStyle="custom-input"/>
                    </div>
                    <div className="otp-modal--timer">
                        <div>
                            <p>{time}</p>
                        </div>
                    </div>
                    <div className="otp-modal--btn">
                        <CustomButton name="CANCEL" styles="custom-btn custom-btn--cancel"/>
                        <CustomButton name="CONTINUE" styles="custom-btn custom-btn--continue"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OTPModalComponent