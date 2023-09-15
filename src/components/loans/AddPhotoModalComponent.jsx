import React, { useState, useRef, useEffect } from "react";
import "../../styles/addphoto.css";

const AddPhotoModal = ({
  isOpen,
  onClose,
  modalTitle,
  modalDefaultGuideImage,
  OnImageSubmitHandler,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [guideImageSrc, setGuideImageSrc] = useState(modalDefaultGuideImage);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);
  const [isChange, setIsChange] = useState(false);
  
  const handleFileChange = (event) => {
    
    setIsChange(true)

    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setUploadedImage(imageUrl);
      setGuideImageSrc(imageUrl);
      setImageName(file.name);

    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  // const handleCloseModalClick = () => {
  //   onClose();
  // };

  const handleImageSubmit = () => {
    console.log(isChange);

    if (isChange) {
      OnImageSubmitHandler(imageName, modalTitle, uploadedImage);
    }else{
      OnImageSubmitHandler("", modalTitle, "");
    }
    onClose();
  }

  useEffect(() => {
    setGuideImageSrc(modalDefaultGuideImage);
    setIsChange(false);
  }, [modalDefaultGuideImage]);

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Upload {modalTitle}</h2>
          <span className="modal-info">
            <span className="question-mark-icon"></span>
          </span>
        </div>
        <div className="modal-body">
          <div className="guide-image-container">
            <img
              className="guide-image"
              src={guideImageSrc}
              alt={`Guide ${modalTitle} Image`}
            />
            {uploadedImage && (
              <img
                className="uploaded-image"
                src={uploadedImage}
                alt={`${modalTitle} Image`}
              />
            )}
          </div>
          {/* <p className="add-photo-text" onClick={handleAddPhotoClick}>
            ADD PHOTO
          </p> */}
          <p className="add-photo-text" onClick={handleAddPhotoClick}>
            ADD PHOTO
          </p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="modal-footer">
          {/* <button onClick={handleCloseModalClick}>OK</button> */}
          <button onClick={handleImageSubmit}>OK</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddPhotoModal;
