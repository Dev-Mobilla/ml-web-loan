const { loan_applications, CustomerDetails, employment_docs, LoanDocs, sequelize } = require('../models/associations');
const {CalculateNetAmount} = require('../utils/DataUtils.utils');
const {ErrorThrower} = require('../utils/ErrorGenerator');
const fields = require('../utils/LoanTypeFields.utils');
// const {FieldValues} = require('../utils/LoanTypeFields.utils');
const SuccessLogger = require('../utils/SuccessLogger');
const {createEmploymentDocs} = require('./employment_docs_controller');
const {HatchITAddLoan, GetLoanTypeFields, GetLoanTypeItemsFields} = require('./hatchit.controller');
const {createLoanDocs} = require('./loan_docs_controller');

async function createLoanApplication(LoanApplicationJsonData, options) {
    try {
        // const createdLoan = await loan_applications.customeCreate(LoanApplicationJsonData, options);
        const createdLoan = await loan_applications.findOrCreate({
            where: {
                application_reference: LoanApplicationJsonData.application_reference
            },
            defaults: { ...LoanApplicationJsonData },
            transaction: options
        });
        
        return createdLoan;

    } catch (error) {
        let message = {
            title: "Request failed",
            body: `We're sorry, something went wrong on our end. Please try again later or contact our support team.`
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error, JSON.stringify(LoanApplicationJsonData));

        throw err;
    }
}

async function getAllLoanApplicants(req, res) {
    try {
        console.log('Models synchronized with the database.');
        const loanApplications = await loan_applications.findAll({
            include: [
                { model: customer_details, attributes: ['customer_details_id'], as: 'customer_details' },
                { model: employment_docs, attributes: ['employment_docu_id'], as: 'employment_docs' },
                { model: vehicle_docs, attributes: ['loan_docu_id'], as: 'vehicle_docs' },
            ],
        });
        const customerDetailsIds = loanApplications.map((loanApp) => loanApp.customer_details_id);
        // const customerDetailsIds = loanApplications.map((loanApp) => loanApp.customer_details_customer_details_id);
        const employmentDocsIds = loanApplications.map((loanApp) => loanApp.employment_docu_id);
        const vehicleDocsIds = loanApplications.map((loanApp) => loanApp.loan_docu_id);

        const customerDetails = await customer_details.findAll({
            where: {
                customer_details_id: customerDetailsIds,
            },
        });
        const employmentDocs = await employment_docs.findAll({
            where: {
                employment_docu_id: employmentDocsIds,
            },
        });
        const vehicleDocs = await vehicle_docs.findAll({
            where: {
                loan_docu_id: vehicleDocsIds,
            },
        });

        const customerDetailsMap = {};
        customerDetails.forEach((customer) => {
            const customerId = customer.customer_details_id;
            customerDetailsMap[customerId] = { customer_details: customer };
        });

        const employmentDocsMap = {};
        employmentDocs.forEach((doc) => {
            const docId = doc.employment_docu_id;
            employmentDocsMap[docId] = { employment_docs: doc };
        });

        const vehicleDocsMap = {};
        vehicleDocs.forEach((doc) => {
            const docId = doc.loan_docu_id;
            vehicleDocsMap[docId] = { vehicle_docs: doc };
        });

        // Combine the loan application data with associated customer_details, employment_docs, and vehicle_docs
        const loanApplicationsWithAssociatedData = loanApplications.map((loanApp) => ({
            ...loanApp.toJSON(),
            ...customerDetailsMap[loanApp.customer_details_customer_details_id],
            ...employmentDocsMap[loanApp.employment_docs_employment_docu_id],
            ...vehicleDocsMap[loanApp.vehicle_docs_vehicle_docu_id],
        }));
        res.send(loanApplicationsWithAssociatedData);
    } catch (error) {
        next(error)
        // return error
        // res.status(500).send('An error occurred');
    }
}

const GetAllApplication = async (req, res, next) => {
    try {
        const FindApplications = await loan_applications.findAll({
            include: [
                { model: CustomerDetails, attributes: ['customer_details_id'], 
                    where: {
                        ckyc_id: req.body.ckyc_id
                    }
                },
            ],
            attributes: [['application_reference', 'ref_num'], ['application_loan_type', 'loan_type_name']]
        })

        res.send(FindApplications)
    } catch (error) {
        next(error)
    }
}

const FindOrCreateCustomer = async (details, options) => {
    try {

        const Customer = await CustomerDetails.findOrCreate({
            where: {
                first_name: details.first_name,
                middle_name: details.middle_name,
                last_name: details.last_name,
                email: details.email,
                mobile_number: details.mobile_number,
                ckyc_id: details.ckyc_id,
                customer_id: details.customer_id
            },
            defaults: { ...details },
            transaction: options,
        })
        return Customer;

    } catch (error) {
        let message = {
            title: "Request failed",
            body: `We're sorry, something went wrong on our end. Please try again later or contact our support team.`
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error, JSON.stringify(details));

        throw err;
    }
}
const FindMaxId = async (modelInstance, idName, options) => {
    try {
        const Id = idName;

        const FindMaxId = await modelInstance.findOne({
            attributes: [
                [sequelize.fn('MAX', sequelize.col(Id)), 'max_id']
            ],
            transaction: options
        })

        return FindMaxId;
        
    } catch (error) {
        let message = {
            title: "Request failed",
            body: `We're sorry, something went wrong on our end. Please try again later or contact our support team.`
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error, idName);
        throw err
    }
}

const AddLoan = async (req, res, next) => {
    try {
        let _customerId;
        let _employmentDocId;
        let _loanDocId;
        const dateInstance = new Date();

        const year = dateInstance.getFullYear().toString();
        const month = (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString();
        const day = ("0" + dateInstance.getDate()).slice(-2).toString();

        const time = dateInstance.getTime();
        const dateNow = `${year}-${month}-${day}`;
        
        const data = JSON.parse(req.body.data);
        // const data = req.body.data;

        const customerDetails = data.CustomerDetailsJsonData;
        const employmentDetails = data.EmploymentJsonData;
        const loanDocsDetails = data.LoanDocJsonData;
        const loanApplication = data.LoanApplicationJsonData;
        const hatchitDetails = data.HatchITJsonData;

        let vehicleDESC = `${loanApplication.chassis_number} ${loanApplication.engine_number} ${loanApplication.plate_number} ${loanApplication.variant} ${loanApplication.model} ${loanApplication.make}  ${loanApplication.year}`;

        let loanTypeFieldItems = {}

        if (loanApplication.application_loan_type === "Car Loan" || loanApplication.application_loan_type === "Motor Loan") {
            loanTypeFieldItems = {
                vehicle_description: vehicleDESC.replace(/NULL|null/g, ""),
                principal_amount: loanApplication.principal_amount,
                unit: loanApplication.loan_type,
                or: loanDocsDetails.original_or,
                comprehensive_insurance: loanDocsDetails.car_insurance,
                set_1_stencil: loanDocsDetails.stencils,
                picture_of_vehicle_1: loanDocsDetails.front_side,
                picture_of_vehicle_2: loanDocsDetails.back_side,
                picture_of_vehicle_3: loanDocsDetails.right_side,
                picture_of_vehicle_4: loanDocsDetails.left_side,
            }
        }else if (loanApplication.application_loan_type === "Real Estate Loan"){
            loanTypeFieldItems = {
                tct_cct: loanDocsDetails.cct_no,
                property_description: loanDocsDetails.property_description,
                land_title: loanDocsDetails.land_title,
                map_of_property: loanDocsDetails.map_of_property,
            }
        }

        const loanTypeFieldValues = {
            valid_id_1: employmentDetails.valid_id,
            certificate_of_employment: employmentDetails.employee_cert,
            payslip: employmentDetails.payslip,
            mayors_permit: employmentDetails.mayor_cert,
            bank_book_statement: employmentDetails.bank_cert
        }

        
        // // DONE - FIELD VALUES
        const getFieldValues = await GetLoanTypeFields(loanApplication.application_loan_type);
        
        const FieldValues = getFieldValues.data.map((item, key) => {

            let fieldObj = Object.keys(loanTypeFieldValues).filter(field => {
                if (field === item.field_name) {
                    return field;
                }
            })

            return {
                value: loanTypeFieldValues[fieldObj[0]] ? loanTypeFieldValues[fieldObj[0]] : "",
                snapshot: JSON.stringify(item),
                field_name: item.field_name
            }
        })

        SuccessLogger(req.url, 200,`GET LOAN TYPE FIELDS: ${JSON.stringify(getFieldValues.data)}, 
        RETREIVED SUCCESSFULLY, LOAN TYPE: ${loanApplication.application_loan_type}, 
        CODE: RETREIVED_SUCCESS` )
        
        // // // FIEDL ITEMS

        const getFieldItem = await GetLoanTypeItemsFields(loanApplication.application_loan_type);

        const fieldItems = {}

        getFieldItem.data.forEach((item, key) => {

            let fieldObj = Object.keys(loanTypeFieldItems).filter(field => {
                if (field === item.field_name) {
                    return field;
                }
            })

            fieldItems[key] = {
                field_name: item.field_name,
                type: item.field_type,
                value: loanTypeFieldItems[fieldObj[0]] ? loanTypeFieldItems[fieldObj[0]] : "",
                snapshot: JSON.stringify(item),
            }

        })

        let FieldItemsValues = JSON.stringify(fieldItems);

        SuccessLogger(req.url, 200,`GET LOAN TYPE ITEM FIELDS: ${JSON.stringify(getFieldItem.data)}, 
            RETREIVED SUCCESSFULLY, LOAN TYPE: ${loanApplication.application_loan_type}, 
            CODE: RETREIVED_SUCCESS` )

        const processing_fee = 3000;
    
        const CollateralDetails = {
            interest: parseFloat(loanApplication.interest),
            principal_amount: parseInt(loanApplication.principal_amount),
            term: parseInt(loanApplication.terms),
            processing_fee: processing_fee,
            net_amount: CalculateNetAmount(processing_fee, loanApplication.principal_amount)
        }
        // let full_name = `${customerDetails.first_name} ${customerDetails.middle_name || customerDetails.middle_name == "NULL" ? customerDetails.middle_name : ""} ${customerDetails.last_name} ${customerDetails.suffix || customerDetails.suffix == "NULL" ? customerDetails.suffix : ""}`;
        let full_name = `${customerDetails.first_name} ${customerDetails.middle_name} ${customerDetails.last_name} ${customerDetails.suffix}`;
        
        const CustomerDetailsHatchit = {
            customer_id: customerDetails.customer_id,
            ckyc_id: customerDetails.ckyc_id,
            full_name: full_name.replace(/NULL|null/g, ""),
            first_name: customerDetails.first_name,
            last_name: customerDetails.last_name,
            contact_number: customerDetails.mobile_number,
            email: customerDetails.email,
            business_name: "",
            country: hatchitDetails.country,
            province: hatchitDetails.provinces,
            city: hatchitDetails.city,
            address: `${hatchitDetails.barangay} ${hatchitDetails.city} ${hatchitDetails.provinces} ${hatchitDetails.country}`,
        }

        const hatchitAddLoan = await HatchITAddLoan(CustomerDetailsHatchit, CollateralDetails, FieldValues , FieldItemsValues, loanApplication.application_loan_type);

        const application_reference = hatchitAddLoan.data.ref_num;
        // const application_reference = "ML12345";
        // const application_date = `${dateNow}`;


        SuccessLogger(req.url, 200,`APPLY LOAN: ${JSON.stringify(hatchitAddLoan.data)}, 
            CREATED SUCCESSFULLY, REFERENCE NUMBER: ${application_reference}, 
            CODE: LOAN_APPLICATION_SUCCESS` )

        const application = await sequelize.transaction(async (transaction) => {

            const custMaxId = await FindMaxId(CustomerDetails, 'customer_details_id', transaction);
            customerDetails.customer_details_id = ++custMaxId.dataValues.max_id;

            const Customer = await FindOrCreateCustomer(customerDetails, transaction);

            _customerId = Customer[0].dataValues.customer_details_id;

            const empMaxId = await FindMaxId(employment_docs, 'employment_docu_id', transaction);
            employmentDetails.employment_docu_id = ++empMaxId.dataValues.max_id;
            employmentDetails.application_reference = application_reference;

            const EmploymentDocs = await createEmploymentDocs(employmentDetails, transaction);

            _employmentDocId = EmploymentDocs[0].dataValues.employment_docu_id;

            const LoanDocsMaxId = await FindMaxId(LoanDocs, 'loan_docu_id', transaction);
            loanDocsDetails.loan_docu_id = ++LoanDocsMaxId.dataValues.max_id;
            loanDocsDetails.application_reference = application_reference;

            const LoanDoc = await createLoanDocs(loanDocsDetails, transaction);
            _loanDocId = LoanDoc[0].dataValues.loan_docu_id;

            const loanMaxId = await FindMaxId(loan_applications, 'id_loan_application', transaction);

            loanApplication.id_loan_application = ++loanMaxId.dataValues.max_id;
            loanApplication.application_reference = application_reference;
            loanApplication.approved_reference = null

            loanApplication.customer_details_id = _customerId;
            loanApplication.loan_docu_id = _loanDocId;
            loanApplication.employment_docu_id = _employmentDocId;

            const LoanApplication = await createLoanApplication(loanApplication, transaction);
            // res.send(custMaxId)

            // transaction.commit();

            SuccessLogger(req.url, 200,`APPLY LOAN: ${JSON.stringify(LoanApplication)}, 
            CREATED: ${LoanApplication[1]}, REFERENCE: ${LoanApplication[0].application_reference}, 
            CODE: DUPLICATE_ENTRY` )

            return LoanApplication
            
        })
        
        res.status(200).send({...hatchitAddLoan});
        // res.status(200).send(ApplyLoan);

    } catch (error) {
        next(error)
    }
}

module.exports = { createLoanApplication, getAllLoanApplicants, FindOrCreateCustomer, AddLoan, GetAllApplication };