import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HousingLoan,
  MainOutlet,
  ManageLoans,
  ManageLoansDetails,
  QuickCashLoan,
  Receipt,
  Error
} from "../pages";
import LoanType from "../pages/LoanType.page";
import CustomerDetails from "../pages/CustomerDetails.page";
import CustomerRequirements from "../pages/CustomerRequirements.page";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainOutlet/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
                errorElement: <Error />,
            },
            {
                path: "/manage-loans",
                element: <ManageLoans />,
                errorElement: <Error />,
            },
            {
                path: '/manage-loans/loan-details',
                element: <ManageLoansDetails/>,
                errorElement: <Error/>
            },
            {
                path: "/manage-loans/housing-loan",
                element: <HousingLoan />,
                errorElement: <Error />,
            },
            {
                path: "/manage-loans/quick-cash-loan/:ref",
                element: <QuickCashLoan />,
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
                path: "/vehicle-loan/receipt",
                element: <Receipt />,
                errorElement: <Error />,
            },
        ]
    },
    {
        path:"*",
        element:<Error/>
    }
]);

export default Router;
