import React, {useEffect, useState} from 'react'
import RequiredDocumentsComponent from '../vehicle/RequiredDocumentsComponent';

import { useNavigate, useLocation } from "react-router-dom";
import {GetSessionDocument} from '../../../utils/DataFunctions';
import {useModal} from '../../../utils/modalContext';
import CustomButton from '../../custom/Custom.button';
import TopbarComponent from '../../layout/TopbarComponent';
import CustomHeader from '../../custom/Custom.header';
import CustomPrevBtn from '../../custom/Custom.prevbtn';
import CustomCardTitle from '../../custom/Custom.cardTitle';
import AddPhotoModal from '../AddPhotoModalComponent';

import PropertyMap from '../../../assets/icons/housing/placeholder.png';
import LandTitle from '../../../assets/icons/housing/key.png';
import PropertyDesc from '../../../assets/icons/housing/magnifying.png';
import {CustomConfirmation, CustomLoadingModal, CustomRequirementDocsComponent} from '../..';


const HousingRequirementsComponent = () => {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confimationProps, setConfimationProps] = useState({});
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
  useModal();
  const [showLoading, setShowLoading] = useState({
    loading: false,
    text: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [housingDocument, setHousingDocument] = useState([
      {
          name: "TCT No. & CCT",
          icon: "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/or-cricon@2x.png",
          key: "orDoc",
          value: null
          // value: sessionStorage.getItem("TCT No. & CCT") ? JSON.parse(sessionStorage.getItem("TCT No. & CCT")) : null
      },

      {
          name: "Map of Property",
          icon: PropertyMap,
          key: "mapProperty",
          value: null
          // value: sessionStorage.getItem("Map of Property") ? JSON.parse(sessionStorage.getItem("Map of Property")) : null

      },
      {
          name: "Land Title",
          icon: LandTitle,
          key: "landTitle",
          // value: sessionStorage.getItem("Land Title") ? JSON.parse(sessionStorage.getItem("Land Title")) : null
          value: null
      },
      {
          name: "Property Description",
          icon: PropertyDesc,
          key: "propertyDesc",
          value: null
      }
  ])
  useEffect(() => {
    console.log(location.state);

    setHousingDocument((currState) => (
      currState?.map((item, key) => {
        item.value = GetSessionDocument(item.name)
        return item
      })
    ))
  },[setHousingDocument])

  useEffect(() => {
      if (location.state == null) {
        navigate(-1);
      }
      const storageLength = sessionStorage.length < 7;
  
      const isCheckEmpty =
        !CheckRequiredDocuments() &&
        !CheckHousingDocuments(housingDocument) &&
        !storageLength;
        setIsSubmitButtonDisabled(!isCheckEmpty);

    }, [optionValue, isSubmitButtonDisabled, sessionStorage]);

  const CheckRequiredDocuments = () => {
      let requiredItems = [];
      let Keys = [];
  
      if (optionValue === "Self-Employed") {
        Keys = ["Valid ID", "Mayor’s Certificate", "Bank Statement"];
      } else if (optionValue === "Employed") {
        Keys = ["Valid ID", "Employee Certificate", "Payslip/ITR"];
      }
  
      for (let key of Keys) {
        const value = JSON.parse(sessionStorage.getItem(key));
        requiredItems.push(value?.url);
      }
  
      return (
        requiredItems?.includes("") ||
        requiredItems?.includes(null) ||
        requiredItems?.includes(undefined)
      );
  };

  const CheckHousingDocuments = (Keys) => {

      const isComplete = Object.keys(Keys).map(key => housingDocument[key].value?.imageName != "" && housingDocument[key].value != null )
    
      return isComplete?.includes(false);
  };

  const OnOptionChange = (optionVal) => {
      setOptionValue(optionVal);
  };

  const ConfirmApplication = () => {
      setShowConfirm(true)
      setConfimationProps({
        title: "Submit Application?",
        message: "Please make sure that all the details provided are correct.",
        confirmBtn: "Submit"
      })
  }

  const OnImageSubmitHandler = (imageName, documentName, url, imageContent) => {
      let imageItem = { imageName, url, documentName, imageContent };
      // console.log(imageItem);
      sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));

      setHousingDocument((currState) => (
        currState?.map((item, key) => {
          item.value = GetSessionDocument(item.name)
          return item
        })
      ))
  
      const storageLength = sessionStorage.length < 7;
  
      const isCheckEmpty =
        !CheckRequiredDocuments() &&
        !CheckHousingDocuments(housingDocument) &&
        !storageLength;

      setIsSubmitButtonDisabled(!isCheckEmpty);
  };
  const OnSubmitRequirementsHandler = async () => {
    // setShowConfirm(false);
    // setShowLoading({
    //   loading: true,
    //   text: "Just a moment",
    // });

    if (sessionStorage.length !== 0 && location.state) {
      console.log(sessionStorage);
      console.log(location.state);
    }

  }
  const LoadingIcon = (
    <div className="spinner-icon">
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          stroke="var(--red)"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 100;100 100;100 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
  return (
    <div className="customer-requirement housing-loan">
        <div className="requirement-container">
            <TopbarComponent />
            <CustomHeader title="Housing Details" />
            <div className="requirement-content">
            <CustomPrevBtn />
            <div className="card">
                <CustomCardTitle
                title="Housing Loan Documents"
                styles="custom-card-title"
                />
                <CustomRequirementDocsComponent availableDocuments={housingDocument}/>
                
            </div>

            <RequiredDocumentsComponent
                OnOptionChange={OnOptionChange}
                validId={GetSessionDocument("Valid ID")}
                employeeCert={GetSessionDocument("Employee Certificate")}
                paySlip={GetSessionDocument("Payslip/ITR")}
                mayorCert={GetSessionDocument("Mayor’s Certificate")}
                bankStatement={GetSessionDocument("Bank Statement")}
            />

              <div className="apply-btn">
                  <CustomButton
                  btnType="submit"
                  name="Submit"
                  styles={isSubmitButtonDisabled ? "btn-disabled" : "btn-enabled"}
                  disabled={isSubmitButtonDisabled}
                  EventHandler={ConfirmApplication}
                  ></CustomButton>
              </div>
            </div>
            {
              showConfirm && (
                <CustomConfirmation
                title={confimationProps.title}
                message={confimationProps.message}
                onClose={() => setShowConfirm(false)}
                onConfirm={OnSubmitRequirementsHandler}
                confirmBtn={confimationProps.confirmBtn}
                />
              )
            }
            {
                showLoading.loading ? (
                <CustomLoadingModal
                  loadingText={showLoading.text}
                  loadingIcon={LoadingIcon}
                />
              ) : (
              <></>
              )
            }
        </div>
        <AddPhotoModal
            isOpen={modalOpen}
            onClose={closeModal}
            modalTitle={modalTitle}
            modalDefaultGuideImage={modalDefaultGuideImage}
            OnImageSubmitHandler={OnImageSubmitHandler}
        />
    </div>
  )
}

export default HousingRequirementsComponent;