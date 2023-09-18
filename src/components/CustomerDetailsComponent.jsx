import React, { useState } from "react";
import axios from "axios";
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
  CustomAlert,
} from "./index";
import { fetchBranch } from "../api/api";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

const CustomerDetailsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState("");
  const [customAlert, setCustomAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [showBranches, setShowBranches] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [nearestBranches, setNearestBranches] = useState([]);
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
    nature_business: "",
    tenure: "",
    office_address: "",
    office_landline: "",
    sourceOfIncome: "",
    monthly_income: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s()-]{7,15}$/;

  const isEmailValid = (email) => emailRegex.test(email);
  const isPhoneValid = (phone) => phoneRegex.test(phone);

  const handleValidationChange = () => {
    const isContactDetailsValid =
      isPhoneValid(contactDetails.mobile_number?.trim() || "") &&
      isEmailValid(contactDetails.email?.trim() || "") &&
      contactDetails.mobile_number?.trim() !== "";

    const isPersonalDetailsValid =
      informationDetails.firstname.trim() !== "" &&
      informationDetails.lastname.trim() !== "" &&
      informationDetails.birthdate.trim() !== "" &&
      informationDetails.civil_status.trim() !== "" &&
      informationDetails.employeer_business_name.trim() !== "" &&
      informationDetails.tenure.trim() !== "" &&
      informationDetails.office_address.trim() !== "" &&
      informationDetails.office_landline.trim() !== "" &&
      informationDetails.sourceOfIncome.trim() !== "" &&
      informationDetails.monthly_income.trim() !== "";
    const isAddressValid = address?.trim() !== "";
    const isOptionSelected = selectedOption !== "";

    setIsSubmitDisabled(
      !(
        isContactDetailsValid &&
        isPersonalDetailsValid &&
        isAddressValid &&
        isOptionSelected
      )
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const secondStepDetails = {
      vehicleDetails: firstStepDetails,
      personalDetails: [contactDetails, informationDetails],
      current_address: address,
      preffered_branch: selectedOption,
    };

    navigate("/vehicle-loan/requirements", {
      state: {
        secondStepDetails,
      },
    });
  };

  const handleInputChange = (field, value) => {
    if (field === "address") {
      setAddress(value);
    } else if (field === "selectedOption") {
      setSelectedOption(value);
    }
    handleValidationChange();
  };

  const handleButtonClick = () => {
    setCustomAlert(true);
    setShowBranches(false);
    setShowAlert(true);
  };

  const handleGeocode = async () => {
    const props = {
      title: "Loading",
      text: "Please wait for a while",
      isError: false,
    };
    setAlertProps(props);
    handleButtonClick(true);
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
          isError: true,
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
        const props = {
          title: "Thank you for waiting",
          text: "We prefer branch near your location",
          isError: true,
        };
        setAlertProps(props);
        setNearestBranches(nearestBranches);
        setShowBranches(true);
      } else {
        const props = {
          title: "Current Address not found!",
          text: "Your current address is not found!",
          isError: true,
        };
        setAlertProps(props);
        handleButtonClick(true);
      }
    } catch (error) {
      const props = {
        title: "Current Address not found!",
        text: "Please input valid current address",
        isError: true,
      };
      setAlertProps(props);
      handleButtonClick(true);
    }
  };

  const handleFindNearestSubmit = async (e) => {
    e.preventDefault();
    if (address.length === 0) {
      const props = {
        title: "Empty Current Address",
        text: "Please enter your Current Address",
        isError: true,
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

  const uniqueNearestBranches = nearestBranches.filter(
    (branch, index, self) =>
      self.findIndex((b) => b.Branch === branch.Branch) === index
  );

  const nearestMLBranches = uniqueNearestBranches.slice(0, 3);

  const fourthNearestUniqueBranch = uniqueNearestBranches.find(
    (branch, index) => uniqueNearestBranches.indexOf(branch) !== index
  );

  if (fourthNearestUniqueBranch) {
    nearestMLBranches.push(fourthNearestUniqueBranch);
  }

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
                onContactDetailsChange={setContactDetails}
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
                onInformationDetailsChange={setInformationDetails}
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
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
              <input type="submit" id="search-btn" value="Search" />
            </form>
            {customAlert && alertProps && showAlert && (
              <CustomAlert
                title={alertProps.title}
                text={alertProps.text}
                isError={alertProps.isError}
                onClose={() => setShowAlert(false)}
              />
            )}
            <div className="customer-details-group">
              {showBranches &&
                nearestMLBranches.map((branch, index) => (
                  <div className="near-branch" key={index}>
                    <div className="c-details-radio">
                      <input
                        type="radio"
                        value={branch.Branch}
                        checked={selectedOption === branch.Branch}
                        onChange={() =>
                          handleInputChange("selectedOption", branch.Branch)
                        }
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
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
