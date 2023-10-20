import React from 'react';
import { Outlet} from "react-router-dom";
import {FooterComponent} from '../components';

const MainOutlet = () => {
  return (
    <>
        <Outlet/>
        <FooterComponent/>
    </>
  )
}

export default MainOutlet;