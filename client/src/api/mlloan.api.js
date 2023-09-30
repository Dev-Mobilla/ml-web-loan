import { useEffect, useState } from "react";
import { MLAxiousInstance } from '../helper/axios';

const AddCarLoan = async (request) => {

    try {
        // const UrlToAddLoan = `/api/ml-loans/tables`;
        const loanType = request.loan_type;
        let plateNumber = request.plate_number;
        let engineNumber = request.engine_number;
        let chassisNumber = request.chassis_number;

        if (loanType === 'new' && (plateNumber === null || engineNumber === null || chassisNumber === null)) {
            plateNumber = null;
            engineNumber = null;
            chassisNumber = null;
        }

        const RequestBody = {
            LoanApplicationJsonData: {
                "id_loan_application": "90",
                "application_reference": "application-reference-1",
                "approved_reference": 'approved-reference-1',
                "application_date": new Date(),
                "vehicle_type": request.vehicle_type,
                "loan_type": 'loan_type_kita',
                "year": '2024',
                "make": 'make my day',
                "model": 'ako',
                "variant": 'variant_ni siya',
                "plate_number": plateNumber,
                "engine_number": engineNumber,
                "chassis_number": chassisNumber,
                "preferred_branch": 'Mas Preferred tikaw',
                "branch_approver_id": 'approve naka!',
                "delete_date": '2023-10-10',
                "update_date": '2023-09-29'
            },
            CustomerDetailsJsonData: {
                customer_details_id: 81,
                last_name: 'Castillo',
                first_name: 'Chemuel',
                middle_name: 'Cosme',
                birth_date: '12/13/20',
                nationality: 'Filipino',
                civil_status: 'Single',
                employer: 'Employer',
                nature_of_business: 'Software Engineer',
                tenure_length: '1,000',
                office_address: 'Benedicto College',
                office_landline: '123456',
                source_of_income: '4545654',
                gross_monthly_income: '987987',
                current_address: 'T. Padilla St.',
                mobile_number: '09484917114',
                email: 'chemuelgodes@gmail.com'
            },
            EmploymentJsonData: {
                employment_docu_id: 81,
                valid_id: 'basta_valid_id',
                employee_cert: 'Employee Certificate bah?',
                payslip: 'Pay and Slip',
                mayor_cert: 'Mayor Reco',
                bank_cert: 'sana-all-naay-certificate'
            },
            VehicleJsonData: {
                vehicle_docu_id: 81,
                original_or: 'sana all original',
                stencils: 'spencils',
                car_insurance: 'sana all naay insurance',
                front_side: 'dili ni siya back side, front side ah!',
                back_side: 'dili ni siya front side, back side ah!',
                right_side: 'dili ni siya left side ahh, right side ni ahh!',
                left_side: 'dili ni siya right side ahh, left side ni siya AHH!'
            }
        }
        console.log(RequestBody);
        // const response = await MLAxiousInstance.post(UrlToAddLoan, {
        //     method: 'POST',
        //     body: JSON.stringify(RequestBody)
        // });

        // if (response == 200) {
        //     console.log('Data:', response);
        // } else {
        //     console.error('Error:', response.JSON);
        // }
    } catch (error) {
        console.error('Error fetching threshold:', error);
        return error;
    }
}
export {
    AddCarLoan
}