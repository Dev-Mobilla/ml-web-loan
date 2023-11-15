import React, { useEffect, useState, useRef } from "react";
import "../styles/otpcomponent.css";
import CustomCardTitle from "./custom/Custom.cardTitle";
import CustomButton from "./custom/Custom.button";

const OTPModalComponent = ({ time, HandleCancel, HandleSubmitOTP }) => {
  const [seconds, setSeconds] = useState(time);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState("");

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    const updatedOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(updatedOtp);
  };

  const handleCancel = () => {
    HandleCancel();
    setOtp("");
  };

  const handleSubmit = () => {
    HandleSubmitOTP(otp);
    setOtp("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setIsDisabled(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="otp-component">
      <div className="otp-modal--overlay">
        <div className="otp-modal--wrapper">
          <div className="otp-modal--container">
            <div className="otp-modal--title">
              <CustomCardTitle title="One Time Pin" styles="custom-title" />
            </div>
            <div className="otp-modal--sub-title">
              <p>We've sent a 6-digit code to your device.</p>
              <p>Please enter the code.</p>
            </div>
            <div className="otp-modal--input">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="custom-input"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(event) => handleInputChange(index, event)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="otp-modal--timer-wrapper">
              <div className="otp-modal--timer-circle">
                <p className="timer-text">{seconds}</p>
              </div>
            </div>
            {isDisabled ? (
              <div className="otp-modal--resend">
                <p>Did not received an OTP?</p>
                <CustomButton
                  name="Resend OTP"
                  styles="resend-btn"
                  EventHandler={() => {
                    setSeconds(60);
                    setIsDisabled(false);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="otp-modal--btn">
              <CustomButton
                name="CANCEL"
                styles="custom-btn custom-btn--cancel"
                EventHandler={handleCancel}
              />
              <CustomButton
                name="CONTINUE"
                styles={
                  isDisabled
                    ? "custom-btn custom-btn--continue disabled"
                    : "custom-btn custom-btn--continue"
                }
                disabled={isDisabled}
                EventHandler={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModalComponent;
