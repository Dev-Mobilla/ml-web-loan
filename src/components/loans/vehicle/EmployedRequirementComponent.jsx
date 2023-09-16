import React from "react";
import "../../../styles/requirements.css";
import { useModal } from "../../../utils/modalContext";
import { SliceIMageName } from "../../../utils/SliceImageName";

const RequiredDocumentsComponent = ({  
  validId,
  employeeCert,
  paySlip 
}) => {
  const { openModal } = useModal();

  return (
    <div className="requirement-group">
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Front Valid ID",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Valid ID"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/valididicon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Valid ID</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${validId.imageName === "" ? "makeRed" : ""}`}>{validId.imageName === "" ? "none" : SliceIMageName(validId.imageName)}</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Employee Certificate",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Employee Certificate"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/empcerticon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Emp. Cert.</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${employeeCert.imageName === "" ? "makeRed" : ""}`}>{employeeCert.imageName === "" ? "none" : SliceIMageName(employeeCert.imageName)}</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Payslip/ITR",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Payslipicon"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/payslipicon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Payslip/ITR</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${paySlip.imageName === "" ? "makeRed" : ""}`}>{paySlip.imageName === "" ? "none" : SliceIMageName(paySlip.imageName)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredDocumentsComponent;
