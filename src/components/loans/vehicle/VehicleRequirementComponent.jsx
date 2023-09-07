import React from "react";
import { useModal } from "../../../utils/modalContext";

const VehicleRequirementComponent = () => {
  const { openModal } = useModal();
  return (
    <div className="requirement-group">
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Orginal OR/CR",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Or Cricon"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/or-cricon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Orginal OR/CR</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">OR/CR Docx.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Set stencils",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Sten Silicon"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/stensilicon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Set stencils</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">Engine Stencils.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Car Insurance",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Car Insurance"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/carinsuranceicon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Car Insurance</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">Docxs123.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Front Side",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Fcaricon"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/fcaricon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Front</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">merjie.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Back Side",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Back Side"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/bcaricon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Back</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">none</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Right Side",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/rcaricon@2x.png"
          alt="Right Side"
        />
        <div className="requirement-text">
          <div className="requirement-title">Right</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">sample.png</div>
          </div>
        </div>
      </div>
      <div
        className="requirement"
        onClick={() =>
          openModal(
            "Left Side",
            "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
          )
        }
      >
        <img
          className="requirement-icon"
          alt="Left Side"
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/lcaricon@2x.png"
        />
        <div className="requirement-text">
          <div className="requirement-title">Left</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className="requirement-file">Leftside.png</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleRequirementComponent;
