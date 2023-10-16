import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    CustomButton,
    CustomHeader,
    TopbarComponent,
  } from "./index";
import '../styles/paymentReceipt.css';

const PaymentReceiptCompoenent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const SuccessIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="55" height="55" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
        </svg>
    )
    const ManageLoansBtn = () => {
        navigate('/manage-loans')
    }

    useEffect(() => {
        console.log(location.state);
        if (!location.state) {
            navigate('/manage-loans')
        }
    })
  return (
    <div className="payment-receipt--wrapper">
        <TopbarComponent/>
        <CustomHeader title={'Payment Receipt'}/>
        <div className="payment-receipt--container">
            <div className="payment-receipt--notification">
                <h1>Payment Successful</h1>
                <p>
                    We're excited to see that you've made your loan payment on time! 
                    Your payment is now being processed and will be posted within 1-3 
                    business days.
                </p>
            </div>
            <div className="payment-receipt--content">
                <div className="payment-receipt--header">
                   <div className="payment-receipt-icon">
                   { SuccessIcon }
                   </div>
                   <div className='payment-header--details'>
                    <p className='pay-bills'>Pay Bills</p>
                    <p className='amount'>Php 1,727.00</p>
                    <p className='paid-date'>13 Oct 2023 12:00 PM</p>
                   </div>
                    <hr style={{ borderColor: '#dcdcdc70', borderWidth: '0.5px' }}/>
                </div>
                <div className="payment-receipt--body">
                    <div className="transaction-details">
                        <div className="transaction-title">
                            <h1>Transaction Details</h1>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Transaction Number
                            </p>
                            <p className="transaction-value">
                                APBDFPAJCQS
                            </p>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Loan Reference No.
                            </p>
                            <p className="transaction-value">
                                MCRRUOXAQZS
                            </p>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Receiver Name
                            </p>
                            <p className="transaction-value">
                                <span className='lastname'>QDTEST</span>,
                                <span className="firstname">DEVTESTQD</span>
                            </p>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Receiver Mobile No.
                            </p>
                            <p className="transaction-value">
                                09856346185
                            </p>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Payment Method
                            </p>
                            <p className="transaction-value">
                                ML Wallet
                            </p>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Biller
                            </p>
                            <p className="transaction-value">
                                ML VEHICLE LOANS AND <br /> FINANCING
                            </p>
                        </div>
                    </div>
                    <div className="transaction-amount">
                        <div className="transaction-title">
                            <h1>Amount</h1>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Amount Sent
                            </p>
                            <p className="transaction-value">
                                Php 1,727.00
                            </p>
                        </div>
                        <div className='transaction-section'>
                            <p className="transaction-label">
                                Service Fee
                            </p>
                            <p className="transaction-value">
                                Php 200.00
                            </p>
                        </div>
                    </div>
                    <div className="transaction-total">
                        <div className='transaction-section'>
                            <p className="transaction-label total">
                                Total
                            </p>
                            <p className="transaction-value">
                                Php 1,727.00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-receipt--footer">
                <CustomButton
                    name={'Manage loans'}
                    styles={'payment-btn'}
                    EventHandler={ManageLoansBtn}
                />
                <span style={{ fontSize: '26px' }}>&#129170;</span>
            </div>
        </div>
    </div>
  )
}

export default PaymentReceiptCompoenent;