import React from "react";
import ReactDOM from 'react-dom';
import "../styles/dashboard.css";

import { FooterComponent, HeaderComponent, TopbarComponent } from "./index";

const DashboardComponent = () => {
  return (
    // <div className={style.index}>
    // <div className={style.div}>
    //   <div className={style.top_bar} />
    //   <div className={style.overlap}>
    //     <header className={style.header}>
    //       <div className="overlap-group">
    //         <div className={style.bannertitle}>Loan Marketplace</div>
    <div className="dashboard">
      <div className="div">
        {/* <div className="top-bar" /> */}
        <TopbarComponent/>
        <div className="overlap">
          <HeaderComponent/>
          {/* <header className="header">
            <div className="overlap-group">
              <div className="bannertitle">Loan Marketplace</div>
              <div className="existing-loan-btn">
                <div className="overlap-group-2">
                  <div className="overlap-2">
                    <div className="m-ltxtt">Manage</div>
                    <div className="m-ltxt">Existing Loans</div>
                  </div>
                  <img
                    className="ml-btn"
                    alt="Ml btn"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/ml-btn-5@2x.png"
                  />
                </div>
              </div>
              <div className="download-btn">
                <div className="overlap-3">
                  <div className="dlcard" />
                  <div className="dltxtt">Download on</div>
                  <div className="dltxt">Google Play</div>
                  <img
                    className="dl-btn"
                    alt="Dl btn"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/dl-btn@2x.png"
                  />
                </div>
              </div>
            </div>
          </header> */}
          <div className="body-bg">
            <img
              className="floating-diamond"
              alt="Floating diamond"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/floating-diamond-left-5@2x.png"
            />
            <img
              className="img"
              alt="Floating diamond"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/floating-diamond-right-5@2x.png"
            />

            <div className="content-card--wrapper">
              <div className="vehicle">
                  <div className="overlap-5">
                    <p className="v-desc">
                      New/Used Cars or Motorcycles
                      <br />
                      Refinance your owned vehicle
                    </p>
                    <div className="vltitle">Vehicle Loan</div>
                    <img
                      className="v-icon"
                      alt="V icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/v-icon@2x.png"
                    />
                  </div>
                </div>
                <div className="housing">
                <div className="overlap-group-3">
                  <div className="hltitle">Housing Loan</div>
                  <div className="h-desc">
                    House/Lot/Condo
                    <br />
                    Refinance an owned house
                  </div>
                  <div className="h-icon">
                    <div className="overlap-group-4">
                      <img
                        className="vector"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-55-8@2x.png"
                      />
                      <div className="rectangle" />
                      <img
                        className="vector-2"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-56-8@2x.png"
                      />
                      <img
                        className="vector-3"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-57-8@2x.png"
                      />
                      <img
                        className="vector-4"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-58-8@2x.png"
                      />
                      <img
                        className="vector-5"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-59-8@2x.png"
                      />
                      <img
                        className="vector-6"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-60-8@2x.png"
                      />
                      <img
                        className="vector-7"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-61-8@2x.png"
                      />
                      <img
                        className="vector-8"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-62-8@2x.png"
                      />
                      <img
                        className="vector-9"
                        alt="Vector"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/vector-63-8@2x.png"
                      />
                      <img
                        className="vector-10"
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
                </div>
              </div>
              <div className="QCL">
                <div className="overlap-group-3">
                  <div className="QC-ltitle">Quick Cash Loan</div>
                  <p className="QCL-desc">
                    Pawn Jewelry, Watches, Others
                    <br />
                    Renew Online
                  </p>
                  <img
                    className="QCL-icon"
                    alt="Qcl icon"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/qcl-icon@2x.png"
                  />
                </div>
              </div>
              <div className="SBL">
                <div className="overlap-group-3">
                  <div className="SB-ltitle">Small Business Loan</div>
                  <div className="SBL-desc">
                    Cash Loans
                    <br />
                    Small Business Owners
                  </div>
                  <img
                    className="SBL-icon"
                    alt="Sbl icon"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/sbl-icon@2x.png"
                  />
                </div>
              </div>
              <div className="pensioner">
                <div className="overlap-group-3">
                  <div className="ptitle">Pensioners’ Loan</div>
                  <p className="p-desc">
                    Cash Loans for Pensioners
                    <br />
                    Online payments via ML Wallet
                  </p>
                  <img
                    className="p-icon"
                    alt="P icon"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/p-icon@2x.png"
                  />
                </div>
              </div>
              <div className="salary">
                <div className="overlap-group-3">
                  <div className="overlap-4">
                    <div className="stitle">Salary Loan</div>
                    <img
                      className="s-icon"
                      alt="S icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/s-icon@2x.png"
                    />
                  </div>
                  <p className="s-desc">
                    Cash Loans for Workers
                    <br />
                    Online payments via ML Wallet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
        {/* <footer className="footer">
          <img
            className="reserved"
            alt="Reserved"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/screenshot-2023-05-31-101930-1.png"
          />
          <img
            className="aboutus"
            alt="Aboutus"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/screenshot-2023-05-31-102020-1@2x.png"
          />
          <img
            className="privacynotice"
            alt="Privacynotice"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/screenshot-2023-05-31-102043-1@2x.png"
          />
        </footer> */}
      </div>
    </div>
  );
};

export default DashboardComponent;