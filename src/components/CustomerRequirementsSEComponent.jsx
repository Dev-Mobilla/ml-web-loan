import React from "react";
import { useState } from "react";
import "../styles/customerrequirementse.css";
import SuccessModal from "./loans/vehicle/SuccessModalComponent";
import {
  CustomHeader,
  CustomPrevBtn,
  TopbarComponent,
  VehicleDocumentsComponent,
  AddPhotoModal,
} from "./index";

const CustomerRequirementsSEComponent = () => {
  const[openModal, setOpenModal] = useState(false);
  return (
    <div className="customer-requirement">
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Manage Existing Loan" />
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
                <a href="/vehicle-loan/requirements">
                  <div className="div-2" />
                </a>
              </div>
              <div className="selfemployed">
                <div className="text-wrapper-5">Self-Employed</div>
                <div className="div-2">
                  <img
                    className="ellipse"
                    alt="Ellipse"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/ellipse-25-3@2x.png"
                  />
                </div>
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
                className="mayor-s-cert"
                onClick={() =>
                  openModal(
                    "Mayor’s Certificate",
                    "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
                  )
                }
              >
                <img
                  className="certficate"
                  alt="Certficate"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/certficate-1@2x.png"
                />
                <div className="text-wrapper-6">Mayor’s Cert.</div>
                <div className="text-wrapper-13">Cert_123.png</div>
              </div>
              <div
                className="bank-statement"
                onClick={() =>
                  openModal(
                    "Bank Statement",
                    "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
                  )
                }
              >
                <img
                  className="credit-card"
                  alt="Credit card"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/credit-card-1@2x.png"
                />
                <div className="text-wrapper-8">Bank Statement</div>
                <div className="text-wrapper-9">Debit.png</div>
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <div className="text-wrapper-7" onClick={()=> {
              setOpenModal(true)
            }}
            >Submit</div>
          </div>
          {openModal && <SuccessModal closeModal={setOpenModal}/>}
        </div>
      </div>
      <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}
      />
    </div>
  );
};

export default CustomerRequirementsSEComponent;
