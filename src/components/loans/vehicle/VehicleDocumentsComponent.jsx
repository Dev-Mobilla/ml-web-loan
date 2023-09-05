import React from 'react';
import "../../../styles/vehicledocuments.css";

const VehicleDocumentsComponent = () => {
  return (
    <div className="vehicledocument">
    <div className="vehicle-overlap">
      <div className="vehicledocument-2">Vehicle Documents</div>
      <div className="icon-group--wrapper">
        <div className="OR-CR">
            <img
              className="OR-cricon"
              alt="Or cricon"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/or-cricon@2x.png"
            />
            <div className="OR-crtxt">Orginal OR/CR</div>
            <p className="OR-crtxtt">
              <span className="span">[x]</span>
              <span className="text-wrapper-3">&nbsp;&nbsp;</span>
              <span className="text-wrapper-4-vehicle">OR/CR Docx.png</span>
            </p>
        </div>
        <div className="stensil">
          <img
            className="stensilicon"
            alt="Stensilicon"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/stensilicon@2x.png"
          />
          <div className="stensiltxt">Set stencils</div>
          <div className="text-wrapper-2">Engine Stencils.png</div>
        </div>
        <div className="carinsurance">
          <img
            className="carinsuranceicon"
            alt="Carinsuranceicon"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/carinsuranceicon@2x.png"
          />
          <div className="carinsurancetxt">Car Insurance</div>
          <div className="carinsurancetxtt">Docxs123.png</div>
        </div>
        <div className="fcar">
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
        <div className="bcar">
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
        <div className="rcar">
          <div className="rcartxt-wrapper">
            <div className="rcartxt">Right</div>
          </div>
          <div className="rcartxtt">sample.png</div>
        </div>
        <div className="lcar">
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
  </div>
  )
}

export default VehicleDocumentsComponent