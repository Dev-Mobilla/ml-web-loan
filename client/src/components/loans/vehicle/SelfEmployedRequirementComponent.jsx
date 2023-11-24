import React from "react";
import "../../../styles/requirements.css";
import { useModal } from "../../../utils/modalContext";
import {SliceIMageName} from "../../../utils/SliceImageName";
import { MakeRed } from "../../../utils/DataFunctions";
import  file  from "../../../assets/images/file.png";

const SelfEmplyoedRequirementComponent = ({
  validId, mayorCert, bankStatement
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
            "Mayor’s Certificate",
            file
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Mayor Certficate"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/certficate-1@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Mayor’s Cert.</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${MakeRed(mayorCert)}`}>
              {
                mayorCert === null ? "none" :
                mayorCert.imageName === "" ? <span style={{ color: 'red' }}>none</span> 
                : SliceIMageName(mayorCert.imageName)
              }
            </div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Bank Statement",
            file
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Credit card"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/credit-card-1@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Bank Statement</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${MakeRed(bankStatement)}`}>
              {
                bankStatement === null ? "none" :
                bankStatement.imageName === "" ? <span style={{ color: 'red' }}>none</span> 
                : SliceIMageName(bankStatement.imageName)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfEmplyoedRequirementComponent;
