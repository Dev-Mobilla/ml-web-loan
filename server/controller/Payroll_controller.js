const axios = require("axios");
const SignatureGenerator = require("../utils/signatureGenerator");
const SuccessLogger = require("../utils/SuccessLogger");
const { ErrorThrower } = require("../utils/ErrorGenerator");
const { FormatDate } = require("../utils/DataUtils.utils");


const PAYROLL_BASE_URL = process.env.PAYROLL_BASE_URL;
const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const getQualified = async (req, res) => {
    try {
        // const { companyName, employeeTenurship, numberOfMonths, businessMonth, divisor } = req.params
        const CompanyName = "ALL";
        const EmployeeTenureship = 2;
        const NumberOfMonths = 3;
        const BusinessMonth = "January 2023";
        const Divisor = 3;



        console.log("Company name: " + CompanyName + "\nEmployee Tenurship: " + EmployeeTenureship + "\nNumber of Months: " + NumberOfMonths + "\nBusiness Month: " + BusinessMonth + "\nDivisor: " + Divisor);
        // Sample Expected Value 
        const TypeOfLoan = "SALARY";
        // const loantype = JSON.stringify({loan_type: LOAN_TYPE.toString()})

        const formattedDate = FormatDate();

        const passPhrase = `${API_KEY}|${SECRET_KEY}|${formattedDate}`;
        console.log("Pasaphrase: ", passPhrase);
        const digest = SignatureGenerator(passPhrase);
        console.log("Digest: ", digest);

        const config = {
            headers: {
                Authorization: `Bearer ${digest}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            params: {
                companyName: CompanyName,
                employeeTenureship: EmployeeTenureship,
                numberOfMonths: NumberOfMonths,
                businessMonth: BusinessMonth,
                divisor: Divisor 
            }
        };
        // console.log("Config: ",config);
        console.log("Get Qualified Employee is already working!");
        // Continution...//

        const URL = `${PAYROLL_BASE_URL}/api/v1/salary_loan/employees/qualified`;
        const response = await GetQualified(URL, config);
        res.send(response.data);
    } catch (error) {
        console.log(error.response);
        res.send(error.response);
    }
}

const CreateSalaryLoanAnnouncement = async (req, res) => {
    try {
        // const { ckycId, title, content } = req.params;

        const ckycId = "X231100001519K1";
        const title = "Test Title";
        const content = "Test Content";

        console.log("CkycID: " + ckycId + "\nTitle: " + title + "\nContent: " + content);
        const formattedDate = FormatDate();

        const passPhrase = `${API_KEY}|${SECRET_KEY}|${formattedDate}`;
        // console.log("Pasaphrase: ", passPhrase);
        const digest = SignatureGenerator(passPhrase);
        // console.log("Digest: ", digest);

        const config = {
            headers: {
                Authorization: `Bearer ${digest}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        };

        const data = {
            ckycId, title, content
        }
        // Continution...//

        const URL = `${PAYROLL_BASE_URL}/api/v1/salary_loan/announcements`;
        const postAnnouncement = await PostAnnouncement(URL, data, config);
        console.log("Post Announcement: ", postAnnouncement);
        console.log("Create Salary Loan Announcement is already working!");
        res.send(postAnnouncement.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}









const PostAnnouncement = async (URL, data, config) => {
    try {

        const response = await axios.post(URL, data, config);

        return response;
        
    } catch (error) {
        throw error
    }
}

const GetQualified = async (URL, config) => {
    try {

        const response = await axios.get(URL, config);
        return response;

    } catch (error) {
        throw error
    }
}

module.exports = {
    getQualified,
    CreateSalaryLoanAnnouncement
}