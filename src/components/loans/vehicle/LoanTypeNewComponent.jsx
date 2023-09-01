import React from "react";
import "../../../styles/loantypenew.css";

const LoanTypeNewComponent = () => {
  return (
    <div className="loan-type--new">
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
        <div className="loantype">
          <div className="overlap">
            <div className="loantypetxt">Loan Type</div>
            <div className="new">
              <div className="text-wrapper-2">New</div>
              <div className="div-2">
                <img
                  className="ellipse"
                  alt="Ellipse"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-1@2x.png"
                />
              </div>
            </div>
            <div className="secondhand">
              <div className="secondhand-2">Second Hand</div>
              <div className="div-2" />
            </div>
            <div className="refinance">
              <div className="text-wrapper-3">Refinance</div>
              <div className="div-2" />
            </div>
          </div>
        </div>
        <div className="samplecomputation">
          <div className="overlap-2">
            <div className="samplecomputationtxt">Sample Computation</div>
            <div className="est-vehicleprice">
              <div className="est-vehicleprice-2">Estimated Vehicle Price</div>
              <div className="est-vehiclepriceph-wrapper">
                <div className="est-vehiclepriceph">1,000,000.00</div>
              </div>
            </div>
            <div className="downpayment">
              <div className="text-wrapper-4">Downpayment</div>
              <div className="div-wrapper">
                <div className="text-wrapper-5">200,000.00</div>
              </div>
            </div>
            <div className="loanamount">
              <div className="loanamount-2">Loan Amount</div>
              <div className="div-wrapper">
                <div className="text-wrapper-5">800,00.00</div>
              </div>
            </div>
            <div className="percentage">
              <div className="element">
                <div className="text-wrapper-6">20%</div>
                <div className="elips">
                  <img
                    className="ellipse"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-3@2x.png"
                  />
                </div>
              </div>
              <div className="element-2">
                <div className="text-wrapper-6">30%</div>
                <div className="elips" />
              </div>
              <div className="element-3">
                <div className="text-wrapper-6">40%</div>
                <div className="elips" />
              </div>
              <div className="element-4">
                <div className="text-wrapper-7">50%</div>
                <div className="elips-2" />
              </div>
            </div>
            <div className="term">
              <div className="term-2">Term (yrs.)</div>
              <div className="element-term">
                <div className="text-wrapper-6">1</div>
                <div className="elips" />
              </div>
              <div className="element-5">
                <div className="text-wrapper-6">2</div>
                <div className="elips" />
              </div>
              <div className="element-6">
                <div className="text-wrapper-6">3</div>
                <div className="elips">
                  <img
                    className="img"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-2@2x.png"
                  />
                </div>
              </div>
              <div className="element-7">
                <div className="text-wrapper-6">4</div>
                <div className="elips" />
              </div>
              <div className="element-8">
                <div className="text-wrapper-6">5</div>
                <div className="elips">
                  <img
                    className="ellipse"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-3@2x.png"
                  />
                </div>
              </div>
            </div>
            <div className="montlypayment">
              <p className="p">
                <span className="span">Monthly Payment* </span>
                <span className="text-wrapper-8">*Subject to approval</span>
              </p>
              <div className="overlap-3">
                <div className="montlypayment-card" />
                <div className="montlypaymentph">13,573.33</div>
              </div>
            </div>
          </div>
        </div>
        <div className="vehicledetails">
          <div className="overlap-4">
            <div className="text-wrapper-9">Vehicle Details</div>
            <div className="car-pickup-suv">
              <div className="text-wrapper-10">Car/Pickup/SUV</div>
              <div className="div-3">
                <div className="ellipse-2" />
              </div>
            </div>
            <div className="motorcycle">
              <div className="text-wrapper-10">Motorcycle</div>
              <div className="div-3" />
            </div>
            <div className="truck-commercial">
              <div className="text-wrapper-10">Truck/Commercial</div>
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
            <div className="variant">
              <div className="variantph-wrapper">
                <input className="variantph" />
              </div>
            </div>
          </div>
        </div>
        <div className="applyonline-btn">
          <div className="applyonline">Apply Online</div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeNewComponent;