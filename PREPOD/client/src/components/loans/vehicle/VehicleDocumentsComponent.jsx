import React from "react";

import "../../../styles/vehicledocuments.css";
import { useModal } from "../../../utils/modalContext";

import { AddPhotoModal } from "../../index";

const VehicleDocumentsComponent = () => {
  const {
    modalOpen,
    modalTitle,
    modalDefaultGuideImage,
    openModal,
    closeModal,
  } = useModal();
  return (
    <div className="vehicledocument">
      <div className="overlap">
        <div className="vehicledocument-2">Vehicle Documents</div>
        <div className="icon-group--wrapper">
          <div
            className="OR-CR"
            onClick={() =>
              openModal(
                "Orginal OR/CR",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <img
              className="OR-cricon"
              alt="Or cricon"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/or-cricon@2x.png"
            />
            <div className="OR-crtxt">Orginal OR/CR</div>
            <p className="OR-crtxtt">
              <span className="span">[x]</span>
              <span className="text-wrapper-3">&nbsp;&nbsp;</span>
              <span className="text-wrapper-4">OR/CR Docx.png</span>
            </p>
          </div>
          <div
            className="stensil"
            onClick={() =>
              openModal(
                "Set stencils",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <img
              className="stensilicon"
              alt="Stensilicon"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/stensilicon@2x.png"
            />
            <div className="stensiltxt">Set stencils</div>
            <div className="text-wrapper-2">Engine Stencils.png</div>
          </div>
          <div
            className="carinsurance"
            onClick={() =>
              openModal(
                "Car Insurance",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <img
              className="carinsuranceicon"
              alt="Carinsuranceicon"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/carinsuranceicon@2x.png"
            />
            <div className="carinsurancetxt">Car Insurance</div>
            <div className="carinsurancetxtt">Docxs123.png</div>
          </div>
          <div
            className="fcar"
            onClick={() =>
              openModal(
                "Front Side",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <div className="overlap-3">
              <img
                className="img"
                alt="Fcaricon"
                src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/fcaricon@2x.png"
              />
              <div className="fcartxt">Front</div>
            </div>
            <div className="fcartxtt">merjie.png</div>
          </div>
          <div
            className="bcar"
            onClick={() =>
              openModal(
                "Back Side",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <div className="overlap-2">
              <img
                className="img"
                alt="Bcaricon"
                src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/bcaricon@2x.png"
              />
              <div className="bcartxt">Back</div>
            </div>
            <div className="bcartxtt">none</div>
          </div>
          <div
            className="rcar"
            onClick={() =>
              openModal(
                "Right Side",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <div className="rcartxt-wrapper">
              <div className="rcartxt">Right</div>
            </div>
            <div className="rcartxtt">sample.png</div>
          </div>
          <div
            className="lcar"
            onClick={() =>
              openModal(
                "Left Side",
                "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/addphotosample@2x.png"
              )
            }
          >
            <div className="overlap-group-2">
              <img
                className="img"
                alt="Lcaricon"
                src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/lcaricon@2x.png"
              />
              <div className="lcartxt">Left</div>
            </div>
            <div className="lcartxtt">Leftside.png</div>
          </div>
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

export default VehicleDocumentsComponent;
