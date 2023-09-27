import { useEffect, useState } from "react";
import { sha512 } from "js-sha512";
import { HatchITAxiosInstance } from "../helper/axios";
import CustomAlert from "../components/custom/Custom.Alert";

// const MakeDigest = (payloadString) => {

//   const digest = sha512(payloadString + "|" + "W1@KLDMWLk@ek$lkj"	);
const api_key = process.env.REACT_APP_API_KEY;
const baseURL = process.env.REACT_APP_HATCHIT_BASE_URL;

const MakeDigest = (payloads) => {
  const payloadString = payloads.join("|");
  const digest = sha512(payloadString);
  return digest;
};

const MakeGetRequest = async (url, params) => {
  try {
    const response = await HatchITAxiosInstance.get(url, {
      params: { ...params },
      responseType: "json"
    });
    // console.log(response);

    let data = {
      data: response.data,
      status: response.status
    }
    return data;

  } catch (error) {
    let err = {
      error,
      status: error.response.status
    }

    return err;
  }
};

const handleErrorResponse = (response) => {
  if (response.status === 404) {
    return "Something went wrong";
  } else if (response.status === 500) {
    const { status, message } = response.data;
    if (status === "CANCELLED" || status === "DENIED") {
      return "Loan is cancelled/denied";
    } else if (status === "PENDING" || status === "APPROVED") {
      return "Loan has no payment schedule";
    } else if (status === "CLOSED") {
      return "Loan is fully paid";
    } else {
      return message;
    }
  } else {
    return "An error occurred while fetching the loan payment schedule.";
  }
};

const GetLoans = async (ckycID) => {

  const payloadString = JSON.stringify(ckycID);
  const ckyc_id = ckycID.ckyc_id;
  const digest = MakeDigest([payloadString, "W1@KLDMWLk@ek$lkj"]);
  const endpoint = `/transactions/get/customer/loans`;
  const params = {
    ckyc_id,
    digest,
  };
  return MakeGetRequest(endpoint, params);
};

const GetLoanDetails = async (referenceNum) => {
  console.log(referenceNum);
  const payloadString = JSON.stringify(referenceNum);
  const reference = referenceNum.reference;
  const digest = MakeDigest([payloadString, "W1@KLDMWLk@ek$lkj"]);
  const endpoint = `/loan_schedules/get/customer/loans/details`;
  const params = {
    reference,
    digest,
  };
  return await MakeGetRequest(endpoint, params);
};

const GetLoanPaymentSchedule = ({ reference, digest }) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          reference,
          digest,
        });
        const url = `${baseURL}/loans_api/v1/loan_schedules/get/schedule?${queryParams.toString()}`;
        const response = await HatchITAxiosInstance.get(url, {
          headers: {
            PUBLIC_API_KEY: api_key,
          },
        });

        if (response.status === 200) {
          return;
        } else {
          const errorMessage = handleErrorResponse(response);
          setErrorMessage(errorMessage);
          setErrorModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching loan payment schedule:", error);
      }
    };

    fetchData();
  }, [reference, digest]);

  const closeModal = () => {
    setErrorModalOpen(false);
  };

  return (
    <>
      {errorModalOpen && (
        <CustomAlert
          title="Error"
          text={errorMessage}
          isError={true}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export { GetLoans, GetLoanDetails, GetLoanPaymentSchedule };
