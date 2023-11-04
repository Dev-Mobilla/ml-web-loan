import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/customerdetails.css";
import { GetCountries, GetProvinces, GetCities } from "../api/symph.api";

import {
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  CustomSelect,
  CustomButton,
  HousingRadiosComponent,
  CustomCardTitle,
  PersonalContactComponent,
  PersonalInformationComponent,
  CustomAlert,
} from "./index";
import { fetchBranch } from "../api/api";
import { SearchKyc } from "../api/symph.api";

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
const CustomerDetailsComponent = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ListOfCountries, setListOfCountries] = useState([]);
  const [ListOfProvinces, setListOfProvinces] = useState([]);
  const [ListOfCities, setListOfCities] = useState([]);

  const [ListOfNoCountries, setListOfNoCountries] = useState([]);
  const [ListOfNoProvinces, setListOfNoProvinces] = useState([]);
  const [ListOfNoCities, setListOfNoCities] = useState([]);
  const [address, setAddress] = useState("");
  const [customAlert, setCustomAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [showBranches, setShowBranches] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(true);

  const [keepAddress, setKeepAAddress] = useState(null);
  const [isCorrespond, setIsCorrespond] = useState(true);
  const [nearestBranches, setNearestBranches] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isSearchParams, setIsSearchParams] = useState(false)
  const { firstStepDetails } = location.state || {};
  const [contactDetails, setContactDetails] = useState({
    mobile_number: "",
    email: "",
  });





  const [informationDetails, setInformationDetails] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    suffix: "",
    birthdate: "",
    suffix: "",
    nationality: "",
    civil_status: "",
    employeer_business: "",
    nature_business: "",
    tenure: "",
    office_address: "",
    office_landline: "",
    sourceOfIncome: "",
    monthly_income: "",
    countries: "",
    provinces: "",
    cities: "",
    barangay: ""
  });
  const confirmRadioVal = [
    {
      name: 'Yes'
    },
    {
      name: 'No'
    }

  ]
  const OnKeepAddress = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setKeepAAddress(value);

    if (value === "Yes") {
      setIsCorrespond(true);
    } else {
      setIsCorrespond(false);
    }
    console.log(keepAddress);
  }
  useEffect(() => {

    if (!keepAddress) {
      console.log(keepAddress);
    } else if (keepAddress.toLowerCase() == "no") {
      setIsCorrespond(false);
    } else {
      setIsCorrespond(true);
    }

    if (location.state == null) {
      navigate(-1);
    }

    const getAddressName = (name) => {
      let isEmpty = name === "" || name === null;

      if (!isEmpty) {
        let nameVal = name.split("|");

        return nameVal[0].toUpperCase();

      }
      return name;

    }
    let barangay = getAddressName(informationDetails.barangay);
    let city = getAddressName(informationDetails.cities);
    let province = getAddressName(informationDetails.provinces);
    let country = getAddressName(informationDetails.countries);
    setAddress(`${barangay} ${city} ${province} ${country}`)
    fetchData();
  }, [informationDetails.barangay,
  informationDetails.cities,
  informationDetails.provinces,
  informationDetails.countries])

  // useEffect(()=> {
  //   performSearch(contactDetails.mobile_number, contactDetails.email)
  // },[contactDetails.email, contactDetails.mobile_number, setAddress])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s()-]{7,15}$/;
  const phRegex = /^(09|\+639)\d{9}$/

  const isEmailValid = (email) => emailRegex.test(email);
  const isPhoneValid = (phone) => phoneRegex.test(phone);

  const handleValidationChange = () => {
    const isContactDetailsValid =
      isPhoneValid(contactDetails.mobile_number || "") &&
      isEmailValid(contactDetails.email || "") &&
      phRegex.test(contactDetails.mobile_number) &&
      contactDetails.mobile_number !== "";
    const isPersonalDetailsValid =
      informationDetails.firstname !== "" &&
      informationDetails.lastname !== "" &&
      informationDetails.birthdate !== "" && informationDetails.birthdate !== null &&
      informationDetails.nationality !== "" && informationDetails.nationality !== null &&
      informationDetails.civil_status !== "" && informationDetails.civil_status !== null &&
      informationDetails.employeer_business !== "" && informationDetails.employeer_business !== null &&
      informationDetails.nature_business !== "" && informationDetails.nature_business !== null &&
      informationDetails.tenure !== "" && informationDetails.tenure !== null &&
      informationDetails.office_address !== "" && informationDetails.office_address !== null &&
      informationDetails.office_landline !== "" && informationDetails.office_landline !== null &&
      informationDetails.sourceOfIncome !== "" && informationDetails.sourceOfIncome !== null &&
      informationDetails.monthly_income !== "" && informationDetails.monthly_income !== null &&
      informationDetails.countries.name !== "" && informationDetails.countries.name !== null &&
      informationDetails.provinces.name !== "" && informationDetails.provinces.name !== null &&
      informationDetails.cities.name !== "" && informationDetails.cities.name !== null &&
      informationDetails.barangay !== "" && informationDetails.barangay !== null;
    const isAddressValid = address !== "";
    const isOptionSelected = selectedOption !== "";

    setIsSubmitDisabled(
      !(
        isContactDetailsValid &&
        isPersonalDetailsValid &&
        isAddressValid &&
        isOptionSelected
      )
    );

    setIsSearchParams(isContactDetailsValid)

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // const secondStepDetails = {
    //   vehicleDetails: firstStepDetails,
    //   personalDetails: [
    //     contactDetails,
    //     informationDetails,
    //     selectedOption,
    //     address
    //   ],
    // };

    if (location.pathname == '/housing-loan/personal-details') {
      let url = '/housing-loan/current-address'

      const secondStepDetails = {
        firstStepDetails: firstStepDetails,
        personalDetails: [
          contactDetails,
          informationDetails,
          selectedOption,
          address
        ],
      };

      navigate(url, {
        state: {
          secondStepDetails: secondStepDetails,
        },
      });
    } else if (location.pathname == '/vehicle-loan/personal-details') {
      let url = '/vehicle-loan/requirements'
      const secondStepDetails = {
        vehicleDetails: firstStepDetails,
        personalDetails: [
          contactDetails,
          informationDetails,
          selectedOption,
          address
        ],
      };

      navigate(url, {
        state: {
          secondStepDetails: secondStepDetails,
        },
      });
    }

  };

  const handleInputChange = (field, value) => {
    if (field === "address") {
      setAddress(value);
    } else if (field === "selectedOption") {
      setSelectedOption(value);
    }
    if (field == "mobile_number") {
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
      subLink: false,
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
          subLink: false,
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
          subLink: false,
        };
        setAlertProps(props);
        setNearestBranches(nearestBranches);
        setShowBranches(true);
      } else {
        const props = {
          title: "Current Address not found!",
          text: "Your current address is not found!",
          isError: true,
          subLink: false
        };
        setAlertProps(props);
        handleButtonClick(true);
      }
    } catch (error) {
      const props = {
        title: "Current Address not found!",
        text: "Please input valid current address",
        isError: true,
        subLink: false
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
        subLink: false
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
  const [errors, setErrors] = useState({});
  const [fieldBorders, setFieldBorders] = useState({
    mobile_number: "1px solid #ccc",
  });
  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };
  const handleBlur = (fieldName) => {
    if (address === "") {
      if (fieldName === "current_address") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your Current Address`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your ${fieldName}`,
        }));
      }
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: "1px solid red",
      }));
    } else {
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: "1px solid #ccc",
      }));
    }

  }

  const performSearch = async (mobileNumber, email) => {
    try {
      const response = await SearchKyc({ cellphoneNumber: mobileNumber, email });
      const data = response.data;
      if (data.data) {
        setContactDetails({
          email: data.data.email,
          mobile_number: data.data.cellphoneNumber
        });
        setInformationDetails({
          firstname: data.data.name.firstName,
          lastname: data.data.name.lastName,
          middlename: data.data.name.middleName,
          suffix: data.data.name.suffix,
          birthdate: data.data.birthDate,
          nationality: data.data.nationality,
          civil_status: data.data.civilStatus,
          office_address: data.data.occupation.workAddress,
          sourceOfIncome: data.data.occupation.sourceOfIncome,
          countries: data.data.addresses.current.addressL0Name,
          provinces: data.data.addresses.current.addressL1Name,
          cities: data.data.addresses.current.addressL2Name,
          barangay: data.data.addresses.current.otherAddress
        });
        setIsEditable(true);
      }
      else {
        setContactDetails({
          email: email,
          mobile_number: mobileNumber
        });
        setInformationDetails({
          firstname: "",
          lastname: "",
          middlename: "",
          birthdate: "",
          suffix: "",
          nationality: "",
          civil_status: "",
          office_address: "",
          sourceOfIncome: "",
          countries: "",
          provinces: "",
          cities: "",
          barangay: ""
        });
        setIsEditable(false);
      }
    } catch (error) {
      return false;
    }

  };
  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      countries: selectedCountryId,
    }));
  };
  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      provinces: selectedProvinceId,
    }));
  };
  const handleNoProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      provinces: selectedProvinceId,
    }));
  };
  const fetchData = async () => {
    try {
      const getCountries = await GetCountries();
      const getProvinces = await GetProvinces();
      const getCities = await GetCities();
      setListOfCountries(await getCountries.data);
      setListOfProvinces(await getProvinces.data);
      setListOfCities(await getCities.data);
      setListOfNoCountries(await getCountries.data);
      setListOfNoProvinces(await getProvinces.data);
      setListOfNoCities(await getCities.data);
    } catch (error) {
    }
    setLoading(false);
  };
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
                performSearch={performSearch}
                contactDetails={contactDetails}
                setContactDetails={setContactDetails}
                isEditable={isEditable}
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
                informationDetails={informationDetails}
                setInformationDetails={setInformationDetails}
                isEditable={isEditable}
              />
            </div>
          </div>
          <div className="card">
            <CustomCardTitle
              title="Preferred Branch"
              subTitle="Select a branch nearest to you"
              styles="custom-card-title"
            />
            <div className="correspond-div">
              <p id="correspondQuestion">Does the address on the previous form correspond to your current address?</p>
              <HousingRadiosComponent
                radioVal={confirmRadioVal}
                onSelected={OnKeepAddress}
                radioName={'currentAddress'}
                styles={'preferred-branch-radios'}
              />
              {!isCorrespond && (
                <>
                  <div className="col1">
                    <div className="correspond-input-div">
                      <select
                        className="correspond-select-left"
                        name="noCountries"
                        onChange={(event) => {
                          handleInputChange(event);
                          handleCountryChange(event);
                        }}
                        onFocus={() => handleFocus('noCountries')}
                        onBlur={() => handleBlur('noCountries')}
                        style={{ border: fieldBorders.countries }}
                      >
                        <option value="">Country</option>
                        {ListOfNoCountries.map((noCountry) => (
                          <option key={noCountry.addressL0Id} value={`${noCountry.name}|${noCountry.addressL0Id}`}>
                            {noCountry.name}
                          </option>
                        ))}
                      </select>
                      <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.noCountries}</div>
                    </div>
                    <div className="correspond-input-div">
                      <select
                        className="correspond-select-right"
                        name="noProvinces"
                        onChange={(event) => {
                          handleInputChange(event);
                          handleNoProvinceChange(event);
                        }}
                        onFocus={() => handleFocus('noProvinces')}
                        onBlur={() => handleBlur('noProvinces')}
                        style={{ border: fieldBorders.provinces }}
                      >
                        <option value="">Province</option>
                        {ListOfNoProvinces.map((province) => (
                          <option key={province.addressL1Id} value={`${province.name}|${province.addressL1Id}`}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.noProvinces}</div>
                    </div>
                  </div>
                  <div className="col2">
                    <div className="correspond-input-div">
                      <select
                        className="correspond-select-left"
                        name="noCities"
                        onChange={(event) => {
                          handleInputChange(event);
                        }}
                        onFocus={() => handleFocus('noCities')}
                        onBlur={() => handleBlur('noCities')}
                        style={{ border: fieldBorders.cities }}
                      >
                        <option value="">City</option>
                        {ListOfNoCities.map((city) => (
                          <option key={city.addressL2Id} value={`${city.name}|${city.addressL2Id}`}>
                            {city.name}
                          </option>
                        ))}
                      </select>

                      <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.noCities}</div>
                    </div>
                    <div className="correspond-input-div">
                      <input
                        className="correspond-text-right"
                        type="text"
                        name="noBarangay"
                        placeholder="Barangay"
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('noBarangay')}
                        onBlur={() => handleBlur('noBarangay')}
                        style={{ border: fieldBorders.barangay }}
                      />
                      <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.noBarangay}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
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
                onFocus={() => handleFocus("current_address")}
                onBlur={() => handleBlur("current_address")}
                style={{ border: fieldBorders.current_address }}
                readOnly
              />
              <input type="submit" id="search-btn" value="Search" />
            </form>
            <div
              style={{
                color: "red",
                fontSize: "12px",
                margin: "10px 20px 20px 23%",
              }}
            >
              {errors.current_address}
            </div>
            {customAlert && alertProps && showAlert && (
              <CustomAlert
                title={alertProps.title}
                text={alertProps.text}
                isError={alertProps.isError}
                subLink={alertProps.subLink}
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
                name="Proceed"
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
