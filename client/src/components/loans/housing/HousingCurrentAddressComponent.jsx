import React, {useEffect, useState} from 'react';
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
    residenceType:""
  })

  const [keepAddress, setKeepAAddress] = useState(null);
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

  const confirmRadioVal = [
    {
      name: 'Yes'
    },
    {
      name: 'No'
    }

  ]

  const { secondStepDetails } = location.state || {};

  useEffect(() => {

    if (!keepAddress) {
      console.log(keepAddress);
      
     
    }else if (keepAddress.toLowerCase() == "no") {
      
    }else if (keepAddress.toLowerCase() == "yes") {
      const address = location.state.secondStepDetails.personalDetails[1];

      setCurrentAddress((currState) => ({
        ...currState,
        country: address.countries,
        province: address.provinces,
        city: address.cities,
        barangay: address.barangay
      }))
    }

  },[])

  useEffect(() => {

    const isCompleted = Object.keys(currentAdress).map(key => currentAdress[key] != "" && currentAdress[key] != null)

    setIsSubmitDisabled(isCompleted.includes(false))

  },[currentAdress])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // localStorage.setItem("firstStep", JSON.stringify(firstStepDetails));
    const thirdStepDetails = {
      secondStepDetails: secondStepDetails,
      currentAdress
    };
    
    navigate("/housing-loan/requirements", {
      state: {
        thirdStepDetails:thirdStepDetails,
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

  const OnKeepAddress = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setKeepAAddress(value);
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
              <div className="confirm-address">
              <p>Does the address on the previous form correspond to your current address?</p>
                <HousingRadiosComponent
                    radioVal={confirmRadioVal}
                    onSelected={OnKeepAddress}
                    radioName={'address'}
                  />
              </div>
              <div className="col">
                <CustomSelect 
                availableOptions={null}
                selectName={"country"}
                selectedOption={currentAdress.country}
                defaultVal={'Country'}
                styles={'custom-select col-1'}/>

                <CustomSelect 
                availableOptions={null}
                selectName={"province"}
                selectedOption={currentAdress.province}
                defaultVal={'Province'}
                styles={'custom-select col-2'}/>
              </div>
              <div className="col">
                <CustomSelect 
                availableOptions={null}
                selectName={"country"}
                selectedOption={currentAdress.city}
                defaultVal={'City'}
                styles={'custom-select col-1'}/>
                <CustomInputField
                  inputType={'text'}
                  inputStyle={'custom-select col-2'}
                  inputOnchange={null}
                  inputVal={currentAdress.barangay}
                  inputPlaceholder={'Barangay'}
                  inputName={'barangay'}
                  readOnly
                />
                {/* <CustomSelect 
                availableOptions={null}
                selectName={"province"}
                selectedOption={currentAdress.barangay}
                defaultVal={'Barangay'}
                styles={'custom-select province'}/> */}
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