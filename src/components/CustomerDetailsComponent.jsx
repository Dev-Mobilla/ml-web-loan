import React from "react";
import "../styles/customerdetails.css";

const CustomerDetailsComponent = () => {
  return (
    <div className="customer-details">
      <div className="div">
        <div className="top-bar" />
        <header className="header">
          <div className="overlap-group">
            <div className="text-wrapper">Personal Details</div>
          </div>
        </header>
        <div className="body-bg">
          <div className="prevpagebtn">
            <img
              className="arrow"
              alt="Arrow"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e4947662fccadecc4ef012/img/arrow-3@2x.png"
            />
          </div>
          <div className="contactdetail">
            <div className="overlap">
              <div className="contactdetailstitle">Contact Details</div>
              <div className="email">
                <div className="input-wrapper">
                  <input className="emailph" />
                </div>
              </div>
              <div className="mobilenumber">
                <div className="input-wrapper">
                  <input className="mobilenumberph" />
                </div>
              </div>
            </div>
          </div>
          <div className="personaldetail">
            <div className="overlap-2">
              <div className="personaldetailtitle">Personal Details</div>
              <div className="firstname">
                <div className="firstnameph-wrapper">
                  <input className="firstnameph" />
                </div>
              </div>
              <div className="lastname">
                <div className="overlap-3">
                  <input className="lastnameph" />
                </div>
              </div>
              <div className="middlename">
                <div className="overlap-3">
                  <input className="middlenameph" />
                </div>
              </div>
              <div className="birthdate">
                <div className="overlap-3">
                  <input className="birthdateph" />
                </div>
              </div>
              <div className="nationality">
                <div className="nationalityph-wrapper">
                  <input className="nationalityph" />
                </div>
                <img
                  className="img"
                  alt="Nationalitydropdown"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/nationalitydropdown@2x.png"
                />
              </div>
              <div className="civilstatus">
                <div className="overlap-3">
                  <input className="civilstatusph" />
                </div>
              </div>
              <div className="natureofbusiness">
                <div className="natureofbusinessph-wrapper">
                  <input className="natureofbusinessph" />
                </div>
                <img
                  className="img"
                  alt="Img"
                  src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/natureofbusinessdropdown@2x.png"
                />
              </div>
              <div className="businessname">
                <div className="overlap-3">
                  <input className="businessnameph" />
                </div>
              </div>
              <div className="lenghtoftenure">
                <div className="overlap-3">
                  <input className="lenghtoftenureph" />
                </div>
              </div>
              <div className="officeaddress">
                <div className="overlap-3">
                  <input className="officeaddressph" />
                </div>
              </div>
              <div className="officelandline">
                <div className="overlap-3">
                  <input className="officelandlineph" />
                </div>
              </div>
              <div className="sourceofincome">
                <div className="overlap-3">
                  <input className="sourceofincomeph" />
                </div>
              </div>
              <div className="grossmonthlyincome">
                <div className="overlap-3">
                  <input className="grossmonthlyincomeph" />
                </div>
              </div>
            </div>
          </div>
          <div className="branch">
            <div className="overlap-4">
              <div className="branchtxt">Preferred Branch</div>
              <p className="branchtxtt">Select a branch nearest you</p>
              <div className="address">
                <p className="p">
                  <span className="span">Danao 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (</span>
                  <span className="text-wrapper-2">see map</span>
                  <span className="span">)</span>
                </p>
                <div className="elips">
                  <div className="ellipse" />
                </div>
              </div>
              <div className="address-2">
                <p className="p">
                  <span className="span">Danao 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (</span>
                  <span className="text-wrapper-3">see map</span>
                  <span className="span">)</span>
                </p>
                <div className="elips" />
              </div>
              <div className="address-3">
                <p className="p">
                  <span className="span">Sogod&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(</span>
                  <span className="text-wrapper-3">see map</span>
                  <span className="span">)</span>
                </p>
                <div className="elips" />
              </div>
            </div>
          </div>
          <div className="submitbtn-nbsp">
            <div className="nbsp" />
            <div className="submit-btn">
              <div className="submittxt">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;