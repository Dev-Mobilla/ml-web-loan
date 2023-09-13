import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/requirements.css";
import { useModal } from "../utils/modalContext";
import {
  AddPhotoModal,
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  TopbarComponent,
  CustomCardTitle,
  VehicleRequirementComponent,
  RequiredDocumentsComponent,
  SuccessModal,
} from "./index";

const CustomerRequirementComponent = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    console.log(location);
  })
  
  const [orDoc, setOrDoc] = useState({
    imageName: "OR/CR Docx.png",
    url: "",
    documentName: ""
  });
  const [stencils, setStencils] = useState({
    imageName: "Engine Stencils.png",
    url: "",
    documentName: ""
  });
  const [carInsurance, setCarInsurance] = useState({
    imageName: "Docxs123.png",
    url: "",
    documentName: ""
  });
  const [front, setFront] = useState({
    imageName: "front.png",
    url: "",
    documentName: ""
  });
  const [back, setBack] = useState({
    imageName: "back.png",
    url: "",
    documentName: ""
  });
  const [right, setRight] = useState({
    imageName: "right.png",
    url: "",
    documentName: ""
  });
  const [left, setLeft] = useState({
    imageName: "left.png",
    url: "",
    documentName: ""
  });

  // const [vehicleDocuments, setVehicleDocuments ] = useState({
  //   orDoc,
  //   stencils,
  //   carInsurance,
  //   front,
  //   back,
  //   right,
  //   left
  // })
  // const { secondStepDetails } = location.state || {};

  // const thirdStepDetails = {
  //   secondStepDetails: secondStepDetails,
  // };

  // localStorage.setItem("SecondStepDetails", JSON.stringify(thirdStepDetails));

  const OnImageSubmitHandler = (imageName, documentName, url) => {
    console.log(modalTitle);
    modalTitle === "Orginal OR/CR" ? setOrDoc({imageName, url, documentName})
    : modalTitle === "Set stencils" ? setStencils({imageName, url, documentName})
    : modalTitle === "Car Insurance" ? setCarInsurance({imageName, url, documentName})
    : modalTitle === "Front Side" ? setFront({imageName, url, documentName})
    : modalTitle === "Back Side" ? setBack({imageName, url, documentName})
    : modalTitle === "Right Side" ? setRight({imageName, url, documentName})
    : modalTitle === "Left Side" ? setLeft({imageName, url, documentName})
    : imageName = "none"
    
  }

  const OnSubmitRequirementsHandler = () => {
    console.log('requirements');
  }

  return (
    <div className="customer-requirement">
      <div className="requirement-container">
        <TopbarComponent />
        <CustomHeader title="Vehicle Details" />
        <div className="requirement-content">
          <CustomPrevBtn />
          <div className="card">
            <CustomCardTitle
              title="Vehicle Documents"
              styles="custom-card-title"
            />
            <VehicleRequirementComponent 
              orDoc={orDoc}
              stencils={stencils}
              carInsurance={carInsurance}
              front={front}
              back={back}
              right={right}
              left={left}
            />
          </div>

          <RequiredDocumentsComponent />

          <div
            className="apply-btn"
            onClick={() => {
              setshowModal(true);
            }}
          >
            <CustomButton
              btnType="submit"
              name="Submit"
              styles="btn-enabled"
              OnSubmitRequirementsHandler={OnSubmitRequirementsHandler}
            ></CustomButton>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal hideModal={setshowModal} />}
      {/* <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}

      /> */}
      <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}
        OnImageSubmitHandler={OnImageSubmitHandler}
      />
    </div>
  );
};

export default CustomerRequirementComponent;
