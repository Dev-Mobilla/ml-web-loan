import React, { useEffect, useState } from 'react';
import '../../../styles/housing.css';
import HousingCardsComponent from './HousingCardsComponent';
import CustomCardTitle from '../../custom/Custom.cardTitle';
import TopbarComponent from '../../layout/TopbarComponent';
import CustomHeader from '../../custom/Custom.header';
import CustomPrevBtn from '../../custom/Custom.prevbtn';
import CustomSelect from '../../custom/Custom.select';

import { useLocation, useNavigate } from 'react-router-dom'
import CustomInputField from '../../custom/Custom.inputfield';
import HousingRadiosComponent from './HousingRadiosComponent';
import CustomButton from '../../custom/Custom.button';

const HousingCurrentAddressComponent = () => {
  const [currentAdress, setCurrentAddress] = useState({
    country: "",
    province: "",
    city: "",
    barangay: "",
    lenghtOfStay: "",
    otherAddress: "",
    residenceType: "Owned (full paid)"
  })

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [inputProps, setIsInputProps] = useState({
    disabled: true,
    isInput: true,
    isReadOnly: true
  });

  const buttonClassName = isSubmitDisabled ? "btn-disabled" : "btn-enabled";

  const location = useLocation();
  const navigate = useNavigate();

  const currendAddressRadioVal = [
    {
      name: 'Owned (full paid)'
    },
    {
      name: 'Renting'
    },
    {
      name: 'Owned (amortizing a housing loan)'
    },
    {
      name: 'Used free or living with Parents/Relatives'
    }

  ]

  const { secondStepDetails } = location.state || {};

  useEffect(() => {
    console.log(secondStepDetails);

    const { isCorrespond, personalDetails } = secondStepDetails

    if (isCorrespond) {
      const currAdd = {
        country: getAddressName(personalDetails[4].countries),
        province: getAddressName(personalDetails[4].provinces),
        city: getAddressName(personalDetails[4].cities),
        barangay: personalDetails[4].barangay
      }
      setCurrentAddress({...currentAdress, ...currAdd })
    }else{
      const currAdd = {
        country: personalDetails[1].countries,
        province: personalDetails[1].provinces,
        city: personalDetails[1].cities,
        barangay: personalDetails[1].barangay
      }
      setCurrentAddress({...currentAdress, ...currAdd })
    }

  }, [secondStepDetails])

  const getAddressName = (name) => {
    let isEmpty = name === "" || name === null;

    if (!isEmpty) {
      let nameVal = name.split("|");

      return nameVal[0].toUpperCase();

    }
    return name;

  }

  useEffect(() => {

    const isCompleted = Object.keys(currentAdress).map(key => currentAdress[key] != "" && currentAdress[key] != null)

    setIsSubmitDisabled(isCompleted.includes(false))

  }, [currentAdress])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // localStorage.setItem("firstStep", JSON.stringify(firstStepDetails));
    const thirdStepDetails = {
      secondStepDetails: secondStepDetails,
      currentAdress
    };

    navigate("/housing-loan/requirements", {
      state: {
        thirdStepDetails: thirdStepDetails,
      },
    });
  };

  const OnInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentAddress((currState) => ({
      ...currState,
      [name]: value
    }))
  }


  return (
    <div className='housing-loan'>
      <div className="housing-container">
        <TopbarComponent />
        <CustomHeader title="Housing Loan" />
        <div className="housing-content">
          <CustomPrevBtn />
          <HousingCardsComponent>
            <CustomCardTitle
              title={'Current Address'}
              styles={'custom-card-title'}
            />
            <div className="col">
              <CustomInputField
                inputType={'text'}
                inputStyle={'custom-select col-1'}
                inputOnchange={null}
                inputVal={currentAdress.country}
                inputPlaceholder={'Country'}
                inputName={'country'}
                readOnly
              />

              <CustomSelect
                availableOptions={null}
                selectName={"province"}
                selectedOption={currentAdress.province}
                defaultVal={'Province'}
                styles={'custom-select col-2'} />
            </div>
            <div className="col">
              <CustomSelect
                availableOptions={null}
                selectName={"city"}
                selectedOption={currentAdress.city}
                defaultVal={'City'}
                styles={'custom-select col-1'} />
              <CustomInputField
                inputType={'text'}
                inputStyle={'custom-select col-2'}
                inputOnchange={null}
                inputVal={currentAdress.barangay}
                inputPlaceholder={'Barangay'}
                inputName={'barangay'}
                readOnly />
            </div>
            <div className="col">
              <CustomInputField
                inputType={'text'}
                inputStyle={'custom-select col-1'}
                inputOnchange={OnInputChange}
                inputVal={currentAdress.lenghtOfStay}
                inputPlaceholder={'Length of stay'}
                inputName={'lenghtOfStay'}
              />
              <CustomInputField
                inputType={'text'}
                inputStyle={'custom-select col-2'}
                inputOnchange={OnInputChange}
                inputVal={currentAdress.otherAddress}
                inputPlaceholder={'House No./Unit No./Building Name/Street'}
                inputName={'otherAddress'}
              />
            </div>
            <div className="residence-type">
              <p>Type of Residence</p>
              <HousingRadiosComponent
                radioVal={currendAddressRadioVal}
                onSelected={OnInputChange}
                radioName={'residenceType'}
                defaultVal={currentAdress.residenceType}
              />
            </div>
          </HousingCardsComponent>
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
  )
}

export default HousingCurrentAddressComponent;