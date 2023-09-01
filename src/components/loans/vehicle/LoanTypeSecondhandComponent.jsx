import React from "react";
import "../../../styles/loantypesecondhand.css";

const LoanTypeSecondHandComponent = () => {
  return (
    <div className="loan-type--second-hand">
      <div className="div">
        <div className="top-bar" />
        <header className="header">
          <div className="overlap-group">
            <div className="text-wrapper">Manage Existing Loans</div>
          </div>
        </header>
        <div className="body-bg">
          <div className="prevpagebtn">
            <img
              className="arrow"
              alt="Arrow"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/arrow-2@2x.png"
            />
          </div>
        </div>
        <div className="element-loantype">
          <div className="overlap">
            <div className="loantypetxt">Loan Type</div>
            <div className="refinance">
              <div className="text-wrapper-2">Refinance</div>
              <div className="div-2" />
            </div>
            <div className="secondhand">
              <div className="secondhand-2">Second Hand</div>
              <div className="div-2">
                <img
                  className="img"
                  alt="Elips"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/elips2nd@2x.png"
                />
              </div>
            </div>
            <div className="new">
              <div className="text-wrapper-3">New</div>
              <div className="elipsnew">
                <div className="ellipse" />
              </div>
            </div>
          </div>
        </div>
        <div className="element-sample">
          <div className="overlap-2">
            <div className="samplecomputationtxt">Sample Computation</div>
            <div className="est-vehicleprice">
              <div className="est-vehicleprice-2">Estimated Vehicle Price</div>
              <div className="est-vehicleprice-ph-wrapper">
                <div className="est-vehicleprice-ph">1,000,000.00</div>
              </div>
            </div>
            <div className="downpayment">
              <div className="text-wrapper-4">Downpayment</div>
              <div className="div-wrapper">
                <div className="text-wrapper-5">300,000.00</div>
              </div>
            </div>
            <div className="percentage">
              <div className="element">
                <div className="text-wrapper-6">50%</div>
                <div className="elips" />
              </div>
              <div className="element-2">
                <div className="text-wrapper-7">40%</div>
                <div className="elips-2" />
              </div>
              <div className="element-3">
                <div className="text-wrapper-8">30%</div>
                <div className="elips-2">
                  <img
                    className="img"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-3@2x.png"
                  />
                </div>
              </div>
            </div>
            <div className="loanamount">
              <div className="loanamount-2">Loan Amount</div>
              <div className="div-wrapper">
                <div className="text-wrapper-5">700,00.00</div>
              </div>
            </div>
            <div className="term">
              <div className="element-term">
                <div className="element-4">3</div>
                <div className="elips-2">
                  <img
                    className="img"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-3@2x.png"
                  />
                </div>
              </div>
              <div className="element-5">
                <div className="text-wrapper-7">2</div>
                <div className="elips-2" />
              </div>
              <div className="element-6">
                <div className="text-wrapper-7">1</div>
                <div className="elips-2" />
              </div>
              <div className="term-2">Term (yrs.)</div>
            </div>
            <div className="monthlypayment">
              <p className="montlypayment">
                <span className="span">
                  Monthly Payment*
                  <br />
                </span>
                <span className="text-wrapper-9">*Subject to approval &amp; appraisal</span>
              </p>
              <div className="overlap-3">
                <div className="monthlypayment-card" />
                <div className="monthlypaymentph">35,000.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-vehicle-details">
          <div className="overlap-4">
            <div className="text-wrapper-10">Vehicle Details</div>
            <div className="car-pickup-suv">
              <div className="text-wrapper-11">Car/Pickup/SUV</div>
              <div className="div-3">
                <div className="ellipse-2" />
              </div>
            </div>
            <div className="motorcycle">
              <div className="text-wrapper-11">Motorcycle</div>
              <div className="div-3" />
            </div>
            <div className="truck-commercial">
              <div className="text-wrapper-11">Truck/Commercial</div>
              <div className="elipstc" />
            </div>
            <div className="year">
              <div className="yearph-wrapper">
                <input className="yearph" />
              </div>
            </div>
            <div className="make">
              <div className="makeph-wrapper">
                <input className="makeph" />
              </div>
            </div>
            <div className="model">
              <div className="modelph-wrapper">
                <input className="modelph" />
              </div>
            </div>
            <div className="color">
              <div className="colorph-wrapper">
                <input className="colorph" />
              </div>
            </div>
            <div className="plate">
              <div className="plateph-wrapper">
                <input className="plateph" />
              </div>
            </div>
            <div className="engine">
              <div className="engineph-wrapper">
                <input className="engineph" />
              </div>
            </div>
            <div className="chassis">
              <div className="chassisph-wrapper">
                <input className="chassisph" />
              </div>
            </div>
          </div>
        </div>
        <div className="applyonlinebtn-nbsp">
          <div className="nbsp" />
          <div className="applyonline-btn">
            <div className="applyonline">Apply Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeSecondHandComponent;