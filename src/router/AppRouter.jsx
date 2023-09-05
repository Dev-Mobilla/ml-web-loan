import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Error,
  HousingLoan,
  ManageLoans,
  QuickCashLoan,
  LoanTypeSecondHand,
  Login,
} from "../pages";
import LoanType from "../pages/LoanType.page";
import CustomerDetails from "../pages/CustomerDetails.page";
import CustomerRequirements from "../pages/CustomerRequirements.page";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: "/manage-loans",
    element: <ManageLoans />,
    errorElement: <Error />,
  },
  {
    path: "/manage-loans/housing-loan",
    element: <HousingLoan />,
    errorElement: <Error />,
  },
  {
    path: "/manage-loans/quick-cash-loan",
    element: <QuickCashLoan />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/vehicle-loan/loan-type/:type",
    element: <LoanType />,
    errorElement: <Error />,
  },
  {
    path: "/vehicle-loan/personal-details",
    element: <CustomerDetails />,
    errorElement: <Error />,
  },
  {
    path: "/vehicle-loan/requirements",
    element: <CustomerRequirements />,
    errorElement: <Error />,
  },
  {
    path: "/not-found",
    element: <h1>NOT FOUND</h1>,
    errorElement: <Error />,
  },
]);

export default Router;
