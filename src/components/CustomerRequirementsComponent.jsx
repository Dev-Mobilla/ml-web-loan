import React, { useState } from "react";
import "../styles/customerrequirement.css";
import { useModal } from "../utils/modalContext";

import {
  CustomHeader,
  CustomPrevBtn,
  TopbarComponent,
  VehicleDocumentsComponent,
  AddPhotoModal,
  AlertModalRequirementsComponent,
  SuccessModal
} from "./index";

const CustomerRequirementsComponent = () => {
  const [isModalRequirementsAlertOpen, setIsModalRequirementsAlertOpen] = useState(false);
  const handleModalRequirementsAlertOpen = () => {
    setIsModalRequirementsAlertOpen(true);
  };
  const handleModalRequirementsAlertClose = () => {
    setIsModalRequirementsAlertOpen(false);
  };
  const {
    modalOpen,
    modalTitle,
    modalDefaultGuideImage,
    openModal,
    closeModal,
  } = useModal();
  const [showModal , setshowModal] = useState(false);
  
  return (
    <div className="customer-requirement">
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Vehicle Details" />
        <div className="body-bg">
          <CustomPrevBtn />
          <VehicleDocumentsComponent />
          <div className="requireddocumente">
            <div className="overlap-4">
              <div className="requireddocument">Required Documents</div>
              <p className="reqdocdetails">
                Note: All documents are required to be uploaded
              </p>
              <div className="employed">
                <div className="text-wrapper-5">Employed</div>
                <div className="div-2">
                  <img
                    className="ellipse"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-3@2x.png"
                  />
                </div>
              </div>
              <div className="selfemployed">
                <div className="text-wrapper-5">Self-Employed</div>
                <a href="./requirements/self-employed">
                  <div className="div-2" />
                </a>
              </div>
              <div
                className="valid-ID"
                onClick={() =>
                  openModal(
                    "Front Valid ID",
                    "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
                  )
                }
              >
                <img
                  className="valid-i-dicon"
                  alt="Valid i dicon"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/valididicon@2x.png"
                />
                <div className="valid-i-dtxt">Valid ID</div>
                <div className="text-wrapper-2">UMID ID.png</div>
              </div>
              <div
                className="empcert"
                onClick={() =>
                  openModal(
                    "Employee Certificate",
                    "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
                  )
                }
              >
                <img
                  className="empcerticon"
                  alt="Empcerticon"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/empcerticon@2x.png"
                />
                <div className="empcerttxt">Emp. Cert.</div>
                <div className="empcerttxtt">Certificate.png</div>
              </div>
              <div
                className="payslip"
                onClick={() =>
                  openModal(
                    "Payslip/ITR",
                    "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
                  )
                }
              >
                <div className="payslipicon">
                  <div className="overlap-5">
                    <img
                      className="payslipicon-2"
                      alt="Payslipicon"
                      src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/payslipicon@2x.png"
                    />
                    <div className="icon">
                      <div className="overlap-group-3">
                        <img
                          className="vector"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/vector-65@2x.png"
                        />
                        <img
                          className="vector"
                          alt="Vector"
                          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/vector-65@2x.png"
                        />
                        <div className="text-wrapper-6">P</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paysliptxt">Payslip/ITR</div>
                <div className="paysliptxtt">File1234.png</div>
              </div>
            </div>
          </div>
          <div className="submit-btn" onClick={handleModalRequirementsAlertOpen} >
            <div className="text-wrapper-7" onClick={() => {setshowModal(true)}} >Submit</div>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal hideModal={setshowModal}/>}
      <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}
      />
      {isModalRequirementsAlertOpen && <AlertModalRequirementsComponent onClose={handleModalRequirementsAlertClose} />}
    </div>
  );
};

export default CustomerRequirementsComponent;
