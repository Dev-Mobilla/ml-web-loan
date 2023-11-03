import React from 'react'
import CustomerDetailsComponent from '../../CustomerDetailsComponent';
import TopbarComponent from '../../layout/TopbarComponent';
import CustomHeader from '../../custom/Custom.header';
import CustomPrevBtn from '../../custom/Custom.prevbtn';

const HousingPersonalDetails = () => {
  return (
    <div className="housing-loan">
      <div className="housing-container">
        <TopbarComponent />
        <CustomHeader title="Housing Loan" />
          <div className="housing-content">
              <CustomPrevBtn />
              <CustomerDetailsComponent/> 
          </div>
      </div>
    </div>     
  )
}

export default HousingPersonalDetails;