import React, {useEffect} from "react";
import { useModal } from "../../../utils/modalContext";
import {SliceIMageName} from "../../../utils/SliceImageName";
import {MakeRed} from "../../../utils/DataFunctions";

const VehicleRequirementComponent = ({ 
  orDoc, stencils, carInsurance, front, back, right, left, session
}) => {
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
            <div className={`requirement-file ${MakeRed(orDoc)}`}>
              {
                orDoc == null ? "OR/CR Docx.png" :
                orDoc.imageName === "" ? "none" 
                : SliceIMageName(orDoc.imageName)
              }
            </div>
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
            <div className={`requirement-file ${MakeRed(stencils)}`}>
              {
                stencils == null ? "Engine Stencils.png" :
                stencils.imageName === "" ? "none" 
                : SliceIMageName(stencils.imageName)
              }
            </div>
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
            <div className={`requirement-file ${MakeRed(carInsurance)}`}>
              {
                carInsurance == null ? "Docxs123.png" :
              carInsurance.imageName === "" ? "none" 
              : SliceIMageName(carInsurance.imageName)}
            </div>
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
          <div className="requirement-title">Front Side</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${MakeRed(front)}`}>
              {
                front == null ? "front.png":
                front.imageName === "" ? "none" 
                : SliceIMageName(front.imageName)
                }
              </div>
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
          <div className="requirement-title">Back Side</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${MakeRed(back)}`}>
              {
                back == null ? "back.png" :
                back.imageName === "" ? "none" 
                : SliceIMageName(back.imageName)
                }
              </div>
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
          <div className="requirement-title">Right Side</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${MakeRed(right)}`}>
              {
                right == null ? "right.png" :
                right.imageName === "" ? "none" 
                : SliceIMageName(right.imageName)
              }
            </div>
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
          <div className="requirement-title">Left Side</div>
          <div className="re-file">
            <div className="re-close">[x]</div>
            <div className={`requirement-file ${MakeRed(left)}`}>
              {
                left == null ? "left.png" :
                left.imageName === "" ? "none" 
                : SliceIMageName(left.imageName)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleRequirementComponent;
