import React, { useState, useEffect } from "react";
import { GetCollateralDetails } from "../../../api/hatchit.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertModalComponent,
  CustomCardTitle,
  CustomHeader,
  CustomPrevBtn,
  TopbarComponent,
  LoadingComponent,
} from "../../index";
import "../../../styles/collateralDetails.css";

const CollateralDetailsComponent = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const LoanReference = params.get("reference");

  const [alertModal, setAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const displayError = (message) => {
    setAlertModal(true);
    setAlertMessage(message);
  };

  const OnModalCloseHandler = () => {
    setAlertModal(false);
    navigate("/manage-loans");
  };

  const [collateralDetails, setCollateralDetails] = useState({
    error: false,
    data: [],
    fields: [],
  });

  useEffect(() => {
    const fetchCollateralDetails = async () => {
      try {
        const response = await GetCollateralDetails({
          reference: LoanReference,
        });

        const { data, fields } = response.data;

        setCollateralDetails({
          error: false,
          data,
          fields,
        });
      } catch (error) {
        const { status, data } = error.response || {};

        if (status === 401) {
          if (data?.message === "No reference number provided.") {
            displayError("Please provide a valid reference number.");
          } else if (data?.message === "No digest provided.") {
            displayError("Please provide a valid digest.");
          } else if (
            data?.message === "Error occurred. Invalid digest provided."
          ) {
            displayError("Invalid digest provided. Please try again.");
          }
        }

        displayError(
          "An internal server error occurred while fetching collateral details."
        );
      }
    };

    fetchCollateralDetails();
  }, [LoanReference]);

  const { data, error, fields } = collateralDetails;

  if (error) {
    return (
      <div>
        <AlertModalComponent
          message={alertMessage}
          onClose={OnModalCloseHandler}
        />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div>
        <TopbarComponent />
        <div className="loan-details" style={{ minHeight: "600px" }}>
          <CustomHeader title="Manage Existing Loan" />
          <LoadingComponent />
        </div>
      </div>
    );
  }

  const collateral = data[0];

  const handleDownload = (fileName, fieldTitle) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const allowedExtensions = ['png', 'pdf', 'jpg'];

    if (allowedExtensions.includes(fileExtension)) {
        fetch(fileName)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${fieldTitle}-collateral-details.${fileExtension}`;
          link.click();
          })
          .catch(error => {
          });
          } else {
          }
    };

  const DownloadIcon = ({ fileName, fieldTitle }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => handleDownload(fileName,fieldTitle)}
      style={{ cursor:'pointer' }}
    >
      <path
        d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
        fill="#14A4F5"
      />
      <path
        d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
        fill="#14A4F5"
      />
    </svg>
  );

  const displayFileName = (fileName, fieldTitle) => {
    const maxLength = 0;
    const display = fileName
      ? fileName.length > maxLength
        ? `${fileName.substr(0, maxLength)} ...${fileName.substr(-15)}`
        : fileName
      : "No File Uploaded";

    return (
      <>
        {display && <span style={{ marginRight: "20px" }}>{display}</span>}
        {fileName && <DownloadIcon fileName={fileName} fieldTitle ={fieldTitle}/>}
      </>
    );
  };

  const formatValue = (value) => {
    return typeof value === "number" ||
      (typeof value === "string" && value.trim() !== "")
      ? value
      : "";
  };

  const excludedFields = [
    "picture_of_vehicle_1",
    "picture_of_vehicle_2",
    "picture_of_vehicle_3",
    "picture_of_vehicle_4",
    "picture_of_vehicle_5",
    "picture_of_vehicle_6",
    "picture_of_vehicle_7",
    "or",
    "cr",
    "set_1_stencil",
    "set_2_stencil",
    "set_3_stencil",
    "comprehensive_insurance",
    "item_remarks",
  ];

  const col = fields.filter(
    (field) =>
      ![
        "Unit",
        "Vehicle Description",
        "Principal Amount (PHP)",
        "Appraised Amount (PHP)",
        ...excludedFields,
      ].includes(field.name)
  );

  return (
    <div className="loan-details">
      <TopbarComponent />
      <CustomHeader title="Manage Existing Loan" />
      {alertModal && (
        <AlertModalComponent
          message={alertMessage}
          onClose={OnModalCloseHandler}
        />
      )}
      <div className="collateral-content">
        <CustomPrevBtn />
        <div className="card">
          <CustomCardTitle
            title="Collateral Details"
            styles="custom-card-title"
          />
          <div className="hl-inputs collateral">
            {col.map((field, index) => (
              <div className="input-group-collateral" key={index}>
                <div className="text-label">{field.title}</div>
                <div className="collateral-input">
                  <input
                    className="disable-data"
                    value={formatValue(collateral[field.name])}
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="collateral-fields">
            <div className="field-group">
              <div className="value value-left">
                {fields.map((field, index) => {
                  if (
                    index < 11 &&
                    ![
                      "unit",
                      "vehicle_description",
                      "principal_amount",
                      "appraised_amount",
                    ].includes(field.name)
                  ) {
                    return (
                      <div className="field" key={index}>
                        <h2 className="field-title">{field.title}</h2>
                        <span className="field-value">
                          {displayFileName(collateral[field.name],field.title)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="value value-right">
                {fields.map((field, index) => {
                  if (
                    index >= 11 &&
                    ![
                      "unit",
                      "vehicle_description",
                      "principal_amount",
                      "appraised_amount",
                      "item_remarks",
                    ].includes(field.name)
                  ) {
                    return (
                      <div className="field" key={index}>
                        <h2 className="field-title">{field.title}</h2>
                        <span className="field-value">
                          {displayFileName(collateral[field.name], field.title)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollateralDetailsComponent;
