import React from "react";
import "../styles/quickcashloan.css";
import { QuickCashHeaderComponent, FooterComponent, TopbarComponent } from "./index";
import pawn_shop from '../assets/icons/pawn-shop.png';


const QuickCashLoanComponent = () => {
  return (

    <div className="quick-cash-loan">
      <div className="div">
        <TopbarComponent />
        <QuickCashHeaderComponent />
        <div className="body">
          <div className="overlap">
          <div className="referencen-number">Ref. no. AAAAAAAAA</div>
            <div className="current-Quick-Cash-ltxt">Quick Cash Loan</div>
            <div className="quick-cash-icon">
              <div className="overlap-4">
                <img className="housing_loan_logo" src={pawn_shop} />
              </div>
            </div>
            <div className="QuickCash-currentcard">
              <div className="overlap-3">
                <img
                  className="QuickCash-currentcard-2"
                  alt="Qc lcurrentcard"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/qclcurrentcard-1@2x.png"
                />
                <div className="QuickCash-currentText">Current</div>
              </div>
            </div>
            <div className="existing-loan">
              <div className="inline-input-label">
                <label htmlFor="principalph">Principal</label>
                <input className="principalph" />
                <label htmlFor="amountdueph">Amount Due</label>
                <input className="amountdueph" />
                <label htmlFor="interest">Interest</label>
                <input className="interest" />
                <label htmlFor="service_charge">Service Charge</label>
                <input className="service_charge" />
                <label htmlFor="net_proceeds">Net Proceeds</label>
                <input className="net_proceeds" />
                <label htmlFor="net_proceeds">Net Proceeds</label>
                <input className="net_proceeds" />
              </div>
              <div className="renewpawn">
                <div className="renewpawntxt">Renew Pawn</div><br /><br />
                <div className="radius-options">
                  <label>
                    <input type="radio" value="1" />1 mo.
                  </label>
                  <label>
                    <input type="radio" value="2" />2 mos.
                  </label>
                  <label>
                    <input type="radio" value="3" />3 mos.
                  </label>
                  <label>
                    <input type="radio" value="4" />4 mos.
                  </label>
                </div>
                <div className="payment_amount_due">
                  <label htmlFor="payment-due">Payment due before</label>
                  <input className="payment-due" /><br />
                  <label htmlFor="amount">Amount Due</label>
                  <input className="amount" />
                </div>
                <br />
                <div className="renewnow-btn">
                  <div className="overlap-group">
                    <div className="renewnowtxt">Renew Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="prevpagebtn">
            <img
              className="arrow"
              alt="Arrow"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/arrow-2-2@2x.png"
            />
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default QuickCashLoanComponent;