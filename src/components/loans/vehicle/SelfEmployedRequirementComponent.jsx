import React from "react";
import "../../../styles/requirements.css";
import { useModal } from "../../../utils/modalContext";
const SelfEmplyoedRequirementComponent = () => {
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
            <div className="requirement-file">UMID ID.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Mayor’s Certificate",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
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
            <div className="requirement-file">Cert_123.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Bank Statement",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
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
            <div className="requirement-file">Debit.png</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfEmplyoedRequirementComponent;
