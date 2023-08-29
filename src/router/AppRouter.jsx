import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import {Dashboard, Error, HousingLoan, ManageLoans, QuickCashLoan} from "../pages";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>,
        errorElement: <Error/>
    },
    {
        path: '/manage-loans',
        element: <ManageLoans/>,
        errorElement: <Error/>
    },
    {
        path: '/manage-loans/housing-loan',
        element: <HousingLoan/>,
        errorElement: <Error/>
    },
    {
        path: '/manage-loans/quick-cash-loan',
        element: <QuickCashLoan/>,
        errorElement: <Error/>
    }
])

export default Router;