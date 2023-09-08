import React, {useEffect} from "react";
import "../styles/manageloans.css";
import {
  TopbarComponent,
  CustomHeader,
  FooterComponent,
  CustomButton,
  CustomPrevBtn,
} from "./index";
import {useLocation} from "react-router-dom";

const ManageLoanComponent = () => {

  const Location = useLocation();

  useEffect(() => {
    console.log(Location);
  })

  return (
    <div className="manage-loans">
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Manage Existing Loans" />
        <div className="body-bg">
          <div className="prev-btn">
            <CustomPrevBtn/>
          </div>
          <div className="container">
            <div className="current-loan-card">
              <div className="current-loan-btn-container">
                <div className="currentloanstxt">Current Loans</div>
                <CustomButton name="Add" styles="custom-button add-btn" />
              </div>
              <div className="housing-loan-card">
                <div className="overlap-2">
                  <div className="icon-content">
                    <div className="hlmng-icon">
                      <div className="overlap-4">
                        <img
                          className="vector"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-55-8@2x.png"
                        />
                        <div className="rectangle" />
                        <img
                          className="img"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-56-8@2x.png"
                        />
                        <img
                          className="vector-2"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-57-8@2x.png"
                        />
                        <img
                          className="vector-3"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-58-8@2x.png"
                        />
                        <img
                          className="vector-4"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-59-8@2x.png"
                        />
                        <img
                          className="vector-5"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-60-8@2x.png"
                        />
                        <img
                          className="vector-6"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-61-8@2x.png"
                        />
                        <img
                          className="vector-7"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-62-8@2x.png"
                        />
                        <img
                          className="vector-8"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-63-8@2x.png"
                        />
                        <img
                          className="vector-9"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-64-8@2x.png"
                        />
                        <img
                          className="shape-copy"
                          alt="Shape copy"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/shape-copy-5-8@2x.png"
                        />
                        <img
                          className="p"
                          alt="P"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/p-8@2x.png"
                        />
                        <div className="ellipse" />
                        <img
                          className="group"
                          alt="Group"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/group-42@2x.png"
                        />
                      </div>
                    </div>
                    <div className="overlap-3">
                      <div className="hlmngtxt">Housing Loan</div>
                      <div className="hlmngtxtt">Ref. no. 00000000000</div>
                    </div>
                  </div>
                  <CustomButton
                    name="Manage"
                    styles="custom-button manage-btn"
                  />
                  {/* <div className="hlmng-btn">
                      <div className="overlap-group-2">
                        <div className="text-wrapper-2">Manage</div>
                      </div>
                    </div> */}
                </div>
              </div>
              <div className="quick-cash-loan-card">
                <div className="overlap-2">
                  <div className="icon-content">
                    <img
                      className="qclmng-icon"
                      alt="Qclmng icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/qcl-icon@2x.png"
                    />
                    <div className="overlap-3">
                      <div className="QC-lmngtxt">Quick Cash Loan</div>
                      <div className="QC-lmngtxtt">Ref. No. ABCDEFGHIJ</div>
                    </div>
                  </div>

                  {/* <div className="qclmng-btn">
                    <div className="overlap-group-2">
                      <div className="text-wrapper-2">Manage</div>
                    </div>
                  </div> */}
                  <CustomButton
                    name="Manage"
                    styles="custom-button manage-btn"
                  />
                </div>
              </div>
              {/* <div className="add-btn">
              <div className="addtxt-wrapper">
                <div className="addtxt">Add</div>
              </div>
            </div> */}
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>
              <div className="overlap">
                <div className="icon-content">
                  <img
                    className="pastloan-icon"
                    alt="Pastloan icon"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/v-icon@2x.png"
                  />
                  <div className="overlap-group">
                    <div className="pastloantxt">Vehicle Loan</div>
                    <div className="pastloantxtt">Ref. no. 0000000000</div>
                  </div>
                </div>
                <CustomButton
                  name="Details"
                  styles="custom-button details-btn"
                />
              </div>
              {/* <div className="pastloan-btn">
                    <div className="div-wrapper">
                      <div className="text-wrapper">Details</div>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default ManageLoanComponent;
