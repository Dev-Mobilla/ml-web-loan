import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

import {
  HeaderComponent,
  TopbarComponent,
  FeatureNotAvailableModalComponent,
} from "./index";
import { isCookiePresent } from "../utils/CookieChecker";

const DashboardComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ManageLoansHandler = () => {
    const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;
    const accountCookieName = process.env.REACT_APP_ACCOUNT_COOKIE_NAME;

    const redirectUrl =
      isCookiePresent(sessionCookieName) && isCookiePresent(accountCookieName)
        ? "/manage-loans"
        : process.env.REACT_APP_REDIRECT_SYMPH_LOGIN;

    window.location.href = `${
      process.env.REACT_APP_REDIRECT_URL
    }?redirect_url=${encodeURIComponent(redirectUrl)}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-div">
        <TopbarComponent />
        <div className="overlap">
          <HeaderComponent manageLoansEvent={ManageLoansHandler} />
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
                <a href="/vehicle-loan/loan-type/new">
                  <div className="overlap-5">
                    <div className="v-desc">
                      <li>New/Used Cars or Motorcycles</li>
                      <li>Refinance your owned vehicle</li>
                    </div>
                    <div className="vltitle">Vehicle Loan</div>
                    <img
                      className="v-icon"
                      alt="V icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/v-icon@2x.png"
                    />
                  </div>
                </a>
              </div>

              <div className="housing">
                <a href="#" onClick={openModal}>
                  <div className="overlap-group-3">
                    <div className="hltitle">Housing Loan</div>
                    <div className="h-desc">
                      <li>House/Lot/Condo</li>
                      <li>Refinance an owned house</li>
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
                </a>
              </div>
              <div className="QCL">
                <a href="#" onClick={openModal}>
                  <div className="overlap-group-qcl">
                    <div className="QC-ltitle">Quick Cash Loan</div>
                    <div className="QCL-desc">
                      <li>Pawn Jewelry, Watches, Others</li>
                      <li> Renew Online</li>
                    </div>
                    <img
                      className="QCL-icon"
                      alt="Qcl icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/qcl-icon@2x.png"
                    />
                  </div>
                </a>
              </div>
              <div className="SBL">
                <a href="#" onClick={openModal}>
                  <div className="overlap-group-sbl">
                    <div className="SB-ltitle">Small Business Loan</div>
                    <div className="SBL-desc">
                      <li>Cash Loans</li>
                      <li> Small Business Owners</li>
                    </div>
                    <img
                      className="SBL-icon"
                      alt="Sbl icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/sbl-icon@2x.png"
                    />
                  </div>
                </a>
              </div>
              <div className="pensioner">
                <a href="#" onClick={openModal}>
                  <div className="overlap-group-pensioner">
                    <div className="ptitle">Pensioners’ Loan</div>
                    <div className="p-desc">
                      <li>Cash Loans for Pensioners</li>
                      <li>Online payments via ML Wallet</li>
                    </div>
                    <img
                      className="p-icon"
                      alt="P icon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/p-icon@2x.png"
                    />
                  </div>
                </a>
              </div>
              <div className="salary">
                <a href="#" onClick={openModal}>
                  <div className="overlap-group-salary">
                    <div className="overlap-4">
                      <div className="stitle">Salary Loan</div>
                      <img
                        className="s-icon"
                        alt="S icon"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/s-icon@2x.png"
                      />
                    </div>
                    <div className="s-desc">
                      <li>Cash Loans for Workers</li>
                      <li> Online payments via ML Wallet</li>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <FooterComponent /> */}
      </div>
      {isModalOpen && (
        <FeatureNotAvailableModalComponent onClose={closeModal} />
      )}
    </div>
  );
};

export default DashboardComponent;
