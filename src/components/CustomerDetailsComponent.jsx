import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/customerdetails.css";
import {
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  CustomButton,
  CustomCardTitle,
  PersonalContactComponent,
  PersonalInformationComponent,
  CustomAlert
} from "./index";
import { fetchBranch } from "../api/api";

import axios from "axios";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const CustomerDetailsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { firstStepDetails } = location.state || {};

  const [contactDetails, setContactDetails] = useState({
    mobile_number: "",
    email: "",
  });

  const [informationDetails, setInformationDetails] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    birthdate: "",
    nationality: "",
    civil_status: "",
    employeer_business_name: "",
    tenure: "",
    office_address: "",
    office_landline: "",
    sourceOfIncome: "",
    monthly_income: "",
  });

  useEffect(() => {
    const isValid =
      contactDetails.mobile_number.trim() !== "" &&
      contactDetails.email.trim() !== "";
    setIsSubmitDisabled(!isValid);
  }, [contactDetails]);

  const handleValidationChange = (isValid) => {
    setIsSubmitDisabled(!isValid);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const secondStepDetails = {
      vehicleDetails: firstStepDetails,
      personalDetails: [contactDetails, informationDetails],
    };

    // localStorage.setItem("SecondStepDetails", JSON.stringify(secondStepDetails));

    navigate("/vehicle-loan/requirements", {
      state: {
        secondStepDetails: secondStepDetails,
      },
    });
  };

  const handleContactDetailsChange = (newContactDetails) => {
    setContactDetails(newContactDetails);
  };

  const handleInformationDetailsChange = (newInformationDetails) => {
    setInformationDetails(newInformationDetails);
  };

  const [address, setAddress] = useState("");
  const [customAlert, setCustomAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [showBranches, setShowBranches] = useState(false);
  const handleButtonClick = () => {
    setCustomAlert(true);
    setShowBranches(false);
  };
  const handleCloseAlert = () => {
    setCustomAlert(false);
  };
  const [nearestBranches, setNearestBranches] = useState([]);
  const handleGeocode = async () => {
    try {
      const apiKey = "cc94f52d646a4bb3a7e53baf4b425e53";
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const { lat, lng } = response.data.results[0].geometry;

      const branches = await fetchBranch();

      if (!branches || branches.length === 0) {
        const props = {
          title: "Please input valid Address",
          text: "Please Input your valid Current Address",
          icon: "warning",
          confirmButtonText: "OK"
        };
        setAlertProps(props);
        handleButtonClick(true);
      }

      const branchData = branches.slice(1);
      const nearestBranches = branchData
        .map((branch) => ({
          Branch: branch[0],
          Latitude: parseFloat(branch[2]),
          Longitude: parseFloat(branch[3]),
        }))
        .sort(
          (a, b) =>
            calculateDistance(lat, lng, a.Latitude, a.Longitude) -
            calculateDistance(lat, lng, b.Latitude, b.Longitude)
        )
        .slice(0, 3);

      if (nearestBranches.length > 0) {
        setNearestBranches(nearestBranches);
        setShowBranches(true);
      } else {
        const props = {
          title: "Current Address not found!",
          text: "Your current address is not found!",
          icon: "warning",
          confirmButtonText: "OK"
        };
        setAlertProps(props);
        handleButtonClick(true);
      }
    } catch (error) {
      const props = {
        title: "Current Address not found!",
        text: "Please input valid current address",
        icon: "warning",
        confirmButtonText: "OK"
      };
      setAlertProps(props);
      handleButtonClick(true);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFindNearestSubmit = (e) => {
    e.preventDefault();
    if (address.length === 0) {
      const props = {
        title: "Empty Current Address",
        text: "Please Input your Current Address",
        icon: "warning",
        confirmButtonText: "OK"
      };
      setAlertProps(props);
      handleButtonClick();
      setShowBranches(false);
    } else {
      handleGeocode();
      fetchBranch();
      setShowBranches(false);
    }
  };

  const buttonClassName = isSubmitDisabled ? "btn-disabled" : "btn-enabled";

  return (
    <div className="customer-details">
      <div className="customer-details-container">
        <TopbarComponent />
        <CustomHeader title="Personal Details" />
        <div className="customer-details-content">
          <CustomPrevBtn />
          <div className="card">
            <CustomCardTitle
              title="Contact Details"
              styles="custom-card-title"
            />
            <div className="customer-details-group">
              <PersonalContactComponent
                onContactDetailsChange={handleContactDetailsChange}
                onValidationChange={handleValidationChange}
              />
            </div>
          </div>

          <div className="card">
            <CustomCardTitle
              title="Personal Details"
              styles="custom-card-title"
            />
            <div className="customer-details-group">
              <PersonalInformationComponent
                onInformationDetailsChange={handleInformationDetailsChange}
                onValidationChange={handleValidationChange}
              />
            </div>
          </div>
          <div className="card">
            <CustomCardTitle
              title="Preferred Branch"
              subTitle="Select a branch nearest to you"
              styles="custom-card-title"
            />
            <form
              className="search-address-bar"
              onSubmit={handleFindNearestSubmit}
            >
              <input
                type="text"
                id="search_address"
                name="current_address"
                placeholder="Current Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input type="submit" id="search-btn" value="Search" />
            </form>
            {customAlert && alertProps && (
              <CustomAlert
                title={alertProps.title}
                text={alertProps.text}
                icon={alertProps.icon}
                confirmButtonText={alertProps.confirmButtonText}
                onClose={handleCloseAlert}
              />
            )}
            <div className="customer-details-group">
              {showBranches && nearestBranches.map((branch, index) => (
                <div className="near-branch" key={index}>
                  <div className="c-details-radio">
                    <input
                      type="radio"
                      value={branch.Branch}
                      checked={selectedOption === branch.Branch}
                      onChange={handleOptionChange}
                    />
                  </div>
                  <div className="map-details">
                    <div className="c-details-address">{branch.Branch}</div>
                    <div className="c-details-map">
                      <a
                        href={`https://www.google.com/maps/place/${branch.Latitude},${branch.Longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (see map)
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="apply-btn">
              <CustomButton
                type="submit"
                name="Submit"
                styles={buttonClassName}
                disabled={isSubmitDisabled}
              ></CustomButton>
            </div>
          </form>
        </div>
        {/* https://www.google.com/maps/place/10%C2%B018'06.9%22N+123%C2%B054'32.3%22E/@10.3019179,123.9064009,17z/data=!3m1!4b1!4m4!3m3!8m2!3d10.3019126!4d123.9089758?entry=ttu */}
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
