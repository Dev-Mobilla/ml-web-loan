import React, {useEffect} from "react";
import { useModal } from "../../../utils/modalContext";
import {SliceIMageName} from "../../../utils/SliceImageName";
import {MakeRed} from "../../../utils/DataFunctions";
import  file  from "../../../assets/images/file.png";

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
            file
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
                orDoc == null ? "none":
                orDoc.imageName === "" ? <span style={{ color: 'red' }}>none</span>
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
            file
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
                stencils == null ? "none" :
                stencils.imageName === "" ? <span style={{ color: 'red' }}>none</span>
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
            file
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
                carInsurance == null ? "none" :
              carInsurance.imageName === "" ? <span style={{ color: 'red' }}>none</span>
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
            file
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
                front == null ? "none":
                front.imageName === "" ? <span style={{ color: 'red' }}>none</span>
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
            file
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
                back == null ? "none":
                back.imageName === "" ? <span style={{ color: 'red' }}>none</span>
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
            file
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
                right == null ? "none":
                right.imageName === "" ? <span style={{ color: 'red' }}>none</span>
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
            file
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
                left == null ? "none":
                left.imageName === "" ? <span style={{ color: 'red' }}>none</span> 
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
