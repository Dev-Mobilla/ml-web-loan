import React, {useEffect, useState} from 'react';
import "../styles/otpcomponent.css";
import CustomCardTitle from './custom/Custom.cardTitle';
import CustomInputField from './custom/Custom.inputfield';
import CustomButton from './custom/Custom.button';

const OTPModalComponent = ({time, HandleOnClose}) => {

// const TimerHandler = () => {
//     let time = 60;
    
//     if (time > 0) {
//         console.log('time: ', time)
//         time--
//         // setTimeout(TimerHandler, 1000)
//     }
//     else{
//         console.log('fsdfdg')
//         // time;
//     }
// } 
const [seconds, setSeconds] = useState(time);
const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      else{
        setIsDisabled(true)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);


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
                    <div className='otp-modal--timer-wrapper'>
                        {/* <div className="otp-modal--timer"></div> */}
                        <div className='otp-modal--timer-circle'>
                            <p className='timer-text'>
                            {
                                seconds
                            }
                            </p>
                        </div>
                    </div>
                    {
                        isDisabled ? 
                            <div className="otp-modal--resend">
                                <p>Did not received an OTP?</p>
                                <CustomButton name="Resend OTP" styles="resend-btn" EventHandler={() => {
                                    setSeconds(60)
                                    setIsDisabled(false);
                                }}/>
                            </div> 
                        : <></>
                    }
                    <div className="otp-modal--btn">
                        <CustomButton name="CANCEL" styles="custom-btn custom-btn--cancel" EventHandler={HandleOnClose}/>
                        <CustomButton name="CONTINUE" styles={isDisabled ? 'custom-btn custom-btn--continue disabled' : 'custom-btn custom-btn--continue' } disabled={isDisabled}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OTPModalComponent