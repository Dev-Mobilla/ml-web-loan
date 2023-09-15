import React, { useState, useRef, useEffect } from "react";
import "../../styles/addphoto.css";

const AddPhotoModal = ({
  isOpen,
  onClose,
  modalTitle,
  modalDefaultGuideImage,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [guideImageSrc, setGuideImageSrc] = useState(modalDefaultGuideImage);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setGuideImageSrc(imageUrl);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleCloseModalClick = () => {
    onClose();
  };

  useEffect(() => {
    setGuideImageSrc(modalDefaultGuideImage);
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
              alt={`Guide ${modalTitle}`}
            />
            {uploadedImage && (
              <img
                className="uploaded-image"
                src={uploadedImage}
                alt={`${modalTitle}`}
              />
            )}
          </div>
          <p className="add-photo-text" onClick={handleAddPhotoClick}>
            ADD PHOTO
          </p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleCloseModalClick}>OK</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddPhotoModal;
