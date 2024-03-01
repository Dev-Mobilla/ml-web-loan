import React, { useEffect } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  CollateralDetails,
  Dashboard,
  MainOutlet,
  ManageLoans,
  ManageLoansDetails,
  Receipt,
  Error,
  PaymentReceipt,
  HousingLoan,
  HousingRequirement,
} from "../pages";
import LoanType from "../pages/LoanType.page";
import CustomerDetails from "../pages/CustomerDetails.page";
import CustomerRequirements from "../pages/CustomerRequirements.page";
import { isCookiePresent } from "../utils/CookieChecker";
import {HousingCurrentAddressComponent, HousingRequiredInfoComponent, HousingRequirementsComponent} from "../components";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;
  const accountCookieName = process.env.REACT_APP_ACCOUNT_COOKIE_NAME;
  const isMLWWSPresent = isCookiePresent(sessionCookieName);
  const isAccountDetailsPresent = isCookiePresent(accountCookieName);
  const login = process.env.REACT_APP_REDIRECT_SYMPH_LOGIN;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

  useEffect(() => {
    if (!isMLWWSPresent && !isAccountDetailsPresent) {
      if (window.location.pathname !== login) {
        window.location.href = `${login}?redirect_url=${encodeURIComponent(
          redirectUrl
        )}`;
      }
    }
  }, [isMLWWSPresent, isAccountDetailsPresent, login, redirectUrl]);

  return <Component {...rest} />;
};

const routes = [
  {
    path: "/",
    element: <MainOutlet />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/manage-loans",
        element: <ProtectedRoute component={ManageLoans} />,
      },
      {
        path: "/manage-loans/loan-details",
        element: <ProtectedRoute component={ManageLoansDetails} />,
      },
      {
        path: "/manage-loans/loan-details/collateral-details",
        element: <ProtectedRoute component={CollateralDetails} />,
      },
      { path: "/vehicle-loan/loan-type/:type", element: <LoanType /> },
      { path: "/vehicle-loan/personal-details", element: <CustomerDetails /> },
      { path: "/vehicle-loan/requirements", element: <CustomerRequirements /> },
      { path: "/housing-loan/required-info", element: <HousingRequiredInfoComponent /> },
      { path: "/housing-loan/personal-details", element: <CustomerDetails/> },
      { path: "/housing-loan/current-address", element: <HousingCurrentAddressComponent/> },
      { path: "/housing-loan/requirements", element: <HousingRequirement/> },
      { path: "/apply-loan/receipt", element: <Receipt /> },
      { path: "/loan/payment-receipt", element: <ProtectedRoute component={PaymentReceipt}/> },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

const Router = createBrowserRouter(routes);

export default Router;
