const { loan_applications, CustomerDetails, employment_docs, vehicle_docs, sequelize } = require('../models/associations');
const {ErrorThrower} = require('../utils/ErrorGenerator');
const fields = require('../utils/LoanTypeFields.utils');
const {FieldValues} = require('../utils/LoanTypeFields.utils');
const SuccessLogger = require('../utils/SuccessLogger');
const {createEmploymentDocs} = require('./employment_docs_controller');
const {HatchITAddLoan, GetLoanTypeFields, GetLoanTypeItemsFields} = require('./hatchit.controller');
const {createVehicleDocs} = require('./vehicle_docs_controller');

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
            title: "Server Error",
            body: "Something went wrong in the server. Please try again later."
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error);

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
                { model: vehicle_docs, attributes: ['vehicle_docu_id'], as: 'vehicle_docs' },
            ],
        });
        const customerDetailsIds = loanApplications.map((loanApp) => loanApp.customer_details_id);
        // const customerDetailsIds = loanApplications.map((loanApp) => loanApp.customer_details_customer_details_id);
        const employmentDocsIds = loanApplications.map((loanApp) => loanApp.employment_docu_id);
        const vehicleDocsIds = loanApplications.map((loanApp) => loanApp.vehicle_docu_id);

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
                vehicle_docu_id: vehicleDocsIds,
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
            const docId = doc.vehicle_docu_id;
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
            title: "Server Error",
            body: "Something went wrong in the server. Please try again later."
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error);

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
            title: "Server Error",
            body: "Something went wrong in the server. Please try again later."
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error);
        throw err
    }
}

const AddLoan = async (req, res, next) => {
    try {
        let _customerId;
        let _employmentDocId;
        let _vehicleDocId;
        const dateInstance = new Date();

        const year = dateInstance.getFullYear().toString();
        const month = (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString();
        const day = ("0" + dateInstance.getDate()).slice(-2).toString();

        const time = dateInstance.getTime();
        const dateNow = `${year}${month}${day}`;
        const application_reference = `MLBP${dateNow}${time}`;

        const data = req.body.data;
        // const data = JSON.parse(req.body.data);

        const customerDetails = data.CustomerDetailsJsonData;
        const employmentDetails = data.EmploymentJsonData;
        const vehicleDetails = data.VehicleJsonData;
        const loanApplication = data.LoanApplicationJsonData;
        const hatchitDetails = data.HatchITJsonData;

        const loanTypeFieldValues = {
            valid_id_1: employmentDetails.valid_id,
            certificate_of_employment: employmentDetails.employee_cert,
            payslip: employmentDetails.payslip,
            mayors_permit: employmentDetails.mayor_cert,
            bank_book_statement: employmentDetails.bank_cert
        }

        // // DONE - FIELD VALUES
        // const getFieldValues = await GetLoanTypeFields();
        // const FieldValues = getFieldValues.data.map((item, key) => {

        //     let fieldObj = Object.keys(loanTypeFieldValues).filter(field => {
        //         if (field === item.field_name) {
        //             return field;
        //         }
        //     })

        //     return {
        //         value: loanTypeFieldValues[fieldObj[0]] ? loanTypeFieldValues[fieldObj[0]] : "",
        //         snapshot: JSON.stringify(item),
        //         field_name: item.field_name
        //     }
        // })
        
        // // // FIEDL ITEMS
        // const loanTypeFieldItems = {
        //     vehicle_description: `${loanApplication.chassis_number} ${loanApplication.engine_number} ${loanApplication.plate_number} ${loanApplication.variant} ${loanApplication.model} ${loanApplication.make}  ${loanApplication.year}`,
        //     principal_amount: loanApplication.principal_amount,
        //     unit: loanApplication.loan_type,
        //     or: vehicleDetails.original_or,
        //     comprehensive_insurance: vehicleDetails.car_insurance,
        //     set_1_stencil: vehicleDetails.stencils,
        //     picture_of_vehicle_1: vehicleDetails.front_side,
        //     picture_of_vehicle_2: vehicleDetails.back_side,
        //     picture_of_vehicle_3: vehicleDetails.right_side,
        //     picture_of_vehicle_4: vehicleDetails.left_side,
        // }

        // const getFieldItem = await GetLoanTypeItemsFields();

        // const fieldItems = {}

        // getFieldItem.data.forEach((item, key) => {

        //     let fieldObj = Object.keys(loanTypeFieldItems).filter(field => {
        //         if (field === item.field_name) {
        //             return field;
        //         }
        //     })

        //     fieldItems[key] = {
        //         field_name: item.field_name,
        //         type: item.field_type,
        //         value: loanTypeFieldItems[fieldObj[0]] ? loanTypeFieldItems[fieldObj[0]] : "",
        //         snapshot: JSON.stringify(item),
        //     }

        // })

        // let FieldItemsValues = JSON.stringify(JSON.stringify(fieldItems))

        
        // // // console.log(FieldItemsValues);
        // // // const fieldsValues = {
        // // //     ...employmentDetails,
        // // //     ...vehicleDetails
        // // // }
        // const CollateralDetails = {
        //     interest: parseFloat(loanApplication.interest) ,
        //     principal_amount: parseInt(loanApplication.principal_amount),
        //     term: parseInt(loanApplication.terms),

        // }
        // let full_name = `${customerDetails.first_name} ${customerDetails.middle_name ? customerDetails.middle_name : ""} ${customerDetails.last_name} ${customerDetails.suffix ? customerDetails.suffix : ""}`;

        // const CustomerDetailsHatchit = {
        //     customer_id: customerDetails.customer_id,
        //     ckyc_id: customerDetails.ckyc_id,
        //     full_name: full_name,
        //     contact_number: customerDetails.mobile_number,
        //     email: customerDetails.email,
        //     business_name: "",
        //     country: hatchitDetails.country,
        //     province: hatchitDetails.provinces,
        //     city: hatchitDetails.city,
        //     address: hatchitDetails.barangay
        // }

        // const hatchitAddLoan = await HatchITAddLoan(CustomerDetailsHatchit, CollateralDetails, FieldValues , FieldItemsValues);

        // const application_reference = hatchitAddLoan.data.ref_num;

        const ApplyLoan = await sequelize.transaction(async (transaction) => {

            const custMaxId = await FindMaxId(CustomerDetails, 'customer_details_id', transaction);
            customerDetails.customer_details_id = ++custMaxId.dataValues.max_id;

            const Customer = await FindOrCreateCustomer(customerDetails, transaction);

            _customerId = Customer[0].dataValues.customer_details_id;

            const empMaxId = await FindMaxId(employment_docs, 'employment_docu_id', transaction);
            employmentDetails.employment_docu_id = ++empMaxId.dataValues.max_id;
            employmentDetails.application_reference = application_reference;

            const EmploymentDocs = await createEmploymentDocs(employmentDetails, transaction);

            _employmentDocId = EmploymentDocs[0].dataValues.employment_docu_id;

            const vehicleMaxId = await FindMaxId(vehicle_docs, 'vehicle_docu_id', transaction);
            vehicleDetails.vehicle_docu_id = ++vehicleMaxId.dataValues.max_id;
            vehicleDetails.application_reference = application_reference;

            const VehicleDocs = await createVehicleDocs(vehicleDetails, transaction);
            _vehicleDocId = VehicleDocs[0].dataValues.vehicle_docu_id;

            const loanMaxId = await FindMaxId(loan_applications, 'id_loan_application', transaction);

            loanApplication.id_loan_application = ++loanMaxId.dataValues.max_id;
            loanApplication.application_reference = application_reference;
            loanApplication.approved_reference = null

            loanApplication.customer_details_id = _customerId;
            loanApplication.vehicle_docu_id = _vehicleDocId;
            loanApplication.employment_docu_id = _employmentDocId;

            const LoanApplication = await createLoanApplication(loanApplication, transaction);
            // res.send(custMaxId)

            // transaction.commit();

            SuccessLogger(req.url, 200,`APPLY LOAN: ${JSON.stringify(LoanApplication)}, 
            CREATED: ${LoanApplication[1]}, REFERENCE: ${LoanApplication[0].application_reference}, 
            CODE: DUPLICATE_ENTRY` )

            return LoanApplication
            
        })
        
        // res.status(200).send({...hatchitAddLoan.data});
        res.status(200).send(ApplyLoan);

    } catch (error) {
        next(error)
    }
}

module.exports = { createLoanApplication, getAllLoanApplicants, FindOrCreateCustomer, AddLoan };