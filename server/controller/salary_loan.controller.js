const axios = require("axios");
const SignatureGenerator = require("../utils/signatureGenerator");

const ML_PRO_API_KEY = process.env.ML_PRO_API_KEY;
const ML_PRO_SECRET_KEY = process.env.ML_PRO_SECRET_KEY;
const ML_PAYPRO_URL = process.env.ML_PAYPRO_URL;
const SMS_DOMAIN = process.env.SMS_DOMAIN;

const getQualifiedEmployees = async (req, res) => {
  try {
    const {
      companyName = process.env.COMPANY_NAME,
      employeeTenureship = process.env.EMPLOYEE_TENURESHIP,
      numberOfMonths = 3,
      businessMonth = "January 2024",
      divisor = 2,
    } = req.query;

    const currentDate = new Date().toISOString().slice(0, 10);

    const passPhrase = `${ML_PRO_API_KEY}|${ML_PRO_SECRET_KEY}|${currentDate}`;
    const signature = SignatureGenerator(passPhrase);
    const headers = {
      Authorization: `Bearer ${signature}`,
    };

    const URL = `${ML_PAYPRO_URL}/api/v1/salary_loan/employees/qualified`;

    const params = {
      companyName,
      employeeTenureship,
      numberOfMonths,
      businessMonth,
      divisor,
    };

    const response = await axios.get(URL, { headers, params });

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching qualified employee", error);
    res.status(5000).json({ error: "Internal Server Error" });
  }
};

const sendSMSNotification = async (employeeDetails) => {
  try {
    const salaryLoanLink = "https://www.google.com";
    // const message = "Congratulations! You are qualified for salary loan by PayPro! Click this link: ";

    const requestBody = {
      username: "d3vsm5p120V!d3r8558",
      password: "Ml2dkl2Oj025t",
      mobileno: employeeDetails.contactNumber, //"09514791515"
      msg: `Congratulations! You are qualified for salary loan by PayPro! Click this link: ${salaryLoanLink}`,
      sender: "MLHUILLIER",
    };

    const smsResponse = await axios.post(`${SMS_DOMAIN}`, requestBody);
    console.log("SMS notification sent to ", employeeDetails.contactNumber, "Response:", smsResponse.data);
    console.log("Response:", smsResponse.data); //END HERE

  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error)
  }
};



module.exports = {
  getQualifiedEmployees, sendSMSNotification
};
