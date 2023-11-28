import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useNavigate } from 'react-router-dom';

import {
  HeaderComponent,
  TopbarComponent,
  FeatureNotAvailableModalComponent,
  CustomIcon,
  CustomCardTitle,
  MobileHeaderComponent,
  CustomHeader
} from "./index";
import { isCookiePresent } from "../utils/CookieChecker";

const DashboardComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
  const[isModalVisible, setModalVisible] = useState (false);

  const handleFeatureModalOpen = (event, link, loantype) =>{
    if (link) {
      event.preventDefault();
      navigate(link, {
        state: {
          loantype
        }
      })
    } else {
      setModalVisible(true);
    }
  };

  const handleFeatureModalClose = () =>{
      setModalVisible(false);              
    }

  const { Housing, Vehicle, QCL, HousingLoan, SBL, Salary, Pension} = CustomIcon;

  const MenuItems = [
    {
      name: "Vehicle Loan",
      icon: <Vehicle/>,
      list: [
        "New/Used Cars or Motorcycles",
        "Refinance your owned vehicle"
      ],
      link: "/vehicle-loan/loan-type/new",
    },
    {
      name: "Housing Loan",
      icon: <HousingLoan/>,
      list: [
        "House/Lot/Condo",
        "Refinance an owned house",
      ],
      link: "/housing-loan/required-info"
    },
    {
      name: "Quick Cash Loan",
      icon: <QCL/>,
      list: [
        "Pawn Jewelry, Watches, Others",
        " Renew Online",
      ],
      link: null
    },
    {
      name: "Small Business Loan",
      icon: <SBL/>,
      list: [
        "Cash Loans",
        " Small Business Owners",
      ],
      link: null
    },
    {
      name: "Pensioner's Loan",
      icon: <Pension/>,
      list: [
        "Cash Loans for Pensioners",
        "Online payments via ML Wallet",
      ],
      link: null
    },
    {
      name: "Salary Loan",
      icon: <Salary/>,
      list: [
        "Cash Loans for Workers",
        " Online payments via ML Wallet",
      ],
      link: null
    }
  ]

  const Menu = () => {
    return MenuItems?.map((item, key) => {
      return (
        <div className="menu-item" key={key} onClick={(e) => handleFeatureModalOpen(e, item.link, item.name)}>
          <div className="menu-item--wrapper">
            <div className="menu-item--col-1">
              {
                item.icon
              }
            </div>
            <div className="menu-item--col-2">
              <CustomCardTitle
                title={item.name}
                styles={'menu-item--title'}
              />
              <div className="menu-item--subtitle">
                {
                  item.list?.map((list, index) => <li key={index} className="subtitle-list">{list}</li>)
                }
              </div>
            </div>
          </div>
        </div>
      )
    })

  } 
 
  return (
    <div className="dashboard">
      <div className="dashboard-div">
        <TopbarComponent />
        <div className="mobile-header-dashboard">
          <CustomHeader
          title={'Loan Marketplace'}
          />
          <MobileHeaderComponent manageLoansEvent={ManageLoansHandler}/>
          <p className="available-loans-text">Available Loans</p>
        </div>
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
                <div className="menu-wrapper">
                  <Menu/>
                </div>
                {isModalVisible && (
                    <FeatureNotAvailableModalComponent onClose={handleFeatureModalClose} />
                )}
            </div>
          </div>
        </div>
        {/* <FooterComponent /> */}
      </div>
    </div>
  );
};

export default DashboardComponent;
