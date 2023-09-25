import React from "react";
import "../../../styles/requirements.css";
import { useModal } from "../../../utils/modalContext";
import { SliceIMageName } from "../../../utils/SliceImageName";
import {MakeRed} from "../../../utils/DataFunctions";
import  file  from "../../../assets/images/file.png";

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
            "Valid ID",
            file
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
            <div className={`requirement-file ${MakeRed(validId)}`}>
              {
                validId === null ? "none":
                validId.imageName === "" ? <span style={{ color: 'red' }}>none</span> 
                : SliceIMageName(validId.imageName)
              }
            </div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Employee Certificate",
            file
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
            <div className={`requirement-file ${MakeRed(employeeCert)}`}>
              {
                employeeCert === null ? "none" :
                employeeCert.imageName === "" ? <span style={{ color: 'red' }}>none</span> 
                : SliceIMageName(employeeCert.imageName)
                }
              </div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Payslip/ITR",
            file
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
            <div className={`requirement-file ${MakeRed(paySlip)}`}>
              {
                paySlip === null ? "none":
                paySlip.imageName === "" ? <span style={{ color: 'red' }}>none</span>
                : SliceIMageName(paySlip.imageName)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredDocumentsComponent;
