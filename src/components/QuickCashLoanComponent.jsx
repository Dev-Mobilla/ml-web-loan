import React from "react";
import "../styles/quickcashloan.css";
import {
  FooterComponent,
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  CustomButton,
  CustomStatus,
} from "./index";
import pawn_shop from "../assets/icons/pawn-shop.png";

const QuickCashLoanComponent = () => {
  return (
    <div className="quick-cash-loan">
      <div className="div">
        <TopbarComponent />
        {/* <QuickCashHeaderComponent /> */}
        <CustomHeader title="Manage Existing Loans" />
        <div className="body">
          <div className="prev-btn">
            <CustomPrevBtn  />
          </div>
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
                <button className="QuickCash-currentcard-2"/>
                {/* <div className="QuickCash-currentText">Current</div> */}
                <CustomStatus status="Current" styles="QuickCash-currentText" />
              </div>
            </div>
            <div className="existing-loan">
              <div className="inline-input-label">
                <div>
                  <label htmlFor="principalph">Principal</label>
                  <label htmlFor="amountdueph">Amount Due</label>
                  <label htmlFor="interest">Interest</label>
                  <label htmlFor="service_charge">Service Charge</label>
                  <label htmlFor="net_proceeds">Net Proceeds</label>
                </div>
                <div>
                  <input className="principalph" />
                  <input className="amountdueph" />
                  <input className="interest" />
                  <input className="service_charge" />
                  <input className="net_proceeds" />
                </div>
              </div>
            </div>
            <div className="renewpawn">
              <div className="renewpawntxt">Renew Pawn</div>
              <br />
              <div className="radius-options">
                <div>
                  <input type="radio" value="1" name="renew-terms"/>
                  <label>1 mo.</label>
                </div>
                <div>
                  <input type="radio" value="2" name="renew-terms"/>
                  <label>2 mos.</label>
                </div>
                <div>
                  <input type="radio" value="3" name="renew-terms"/>
                  <label>3 mos.</label>
                </div>
                <div>
                  <input type="radio" value="4" name="renew-terms"/>
                  <label>4 mos.</label>
                </div>
              </div>
              <div className="payment_amount_due">
                <div className="payment_due_before">
                  <label htmlFor="payment-due">Payment due before</label>
                  <label htmlFor="amount">Amount Due</label>
                </div>
                <div className="amount_due">
                  <input className="payment-due" />
                  <input className="amount" />
                </div>
              </div>
              <div className="renewnow-btn">
                <div className="overlap-group">
                  <CustomButton name="Renew Now" styles="renewnowtxt" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default QuickCashLoanComponent;
