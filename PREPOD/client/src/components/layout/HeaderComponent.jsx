import "../../styles/header.css";
import React, { useState } from 'react';
import { 
  QRComponent,
} from '../index';

const HeaderComponent = ({manageLoansEvent}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <header className="header">
      <div className="overlap-group">
        <div className="bannertitle">Loan Marketplace</div>
        <div className="download-btn">
          <div className="overlap-3">
            <div className="dlcard" onClick={handleModalOpen}>
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
        <div className="existing-loan-btn" onClick={manageLoansEvent}>
          <div className="overlap-group-2">
            <div className="overlap-2" />
            <div className="m-ltxtt">Manage</div>
            <div className="m-ltxt">Existing Loans</div>
            <img
              className="ml-btn"
              alt="Ml btn"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/ml-btn-5@2x.png"
            />
          </div>
        </div>
      </div>
      {isModalOpen && <QRComponent onClose={handleModalClose} />}
    </header>
  )
}

export default HeaderComponent;
