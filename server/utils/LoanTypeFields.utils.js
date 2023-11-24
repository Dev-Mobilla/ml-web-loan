// const FieldValues = (fields, itemFieldName) => {
//     // let field_name;

//     for (const key in fields) {
//         if (fields.hasOwnProperty(key)) {
//             const element = fields[key];
//             return {
//                 name: key,
//                 value: element
//             }
//         }
//     }

//     // return field_name

// }

// module.exports = {
//     FieldValues
// }
const parser = (val) => {
    return JSON.parse(val)
}

const fields = () => {
    return [
        parser("{\"id\":1,\"field_title\":\"Chattel Fee (PHP)\",\"field_name\":\"chattel_fee\",\"field_type\":\"Number\",\"possible_values\":\"-1\",\"default_value\":\"0\",\"is_required\":true,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-11-22T05:48:44.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":2,\"field_title\":\"Valid ID 1\",\"field_name\":\"valid_id_1\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":true,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":3,\"field_title\":\"Valid ID 2\",\"field_name\":\"valid_id_2\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":true,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":4,\"field_title\":\"Marriage Certificate\",\"field_name\":\"marriage_certificate\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":5,\"field_title\":\"Billing Statement\",\"field_name\":\"billing_statement\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":6,\"field_title\":\"Certificate of Employment\",\"field_name\":\"certificate_of_employment\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":7,\"field_title\":\"Payslip (last 3 mos.)\",\"field_name\":\"payslip\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":8,\"field_title\":\"Latest ITR (Form 2316)\",\"field_name\":\"itr_2316\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":9,\"field_title\":\"Contract of Employment\",\"field_name\":\"contract_of_employment\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":10,\"field_title\":\"Allotment Slip (last 3 mos.)\",\"field_name\":\"allotment_slip\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":11,\"field_title\":\"Voucher for Commission\",\"field_name\":\"voucher_for_commission\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":15,\"field_title\":\"Latest Mayor's Permit\",\"field_name\":\"mayors_permit\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
        parser("{\"id\":18,\"field_title\":\"Bank Book/Statement (last 3 mos.)\",\"field_name\":\"bank_book_statement\",\"field_type\":\"File\",\"possible_values\":\"-1\",\"default_value\":\"-1\",\"is_required\":false,\"is_hide_customer\":false,\"createdAt\":\"2022-07-25T02:56:46.000Z\",\"updatedAt\":\"2022-07-25T02:56:46.000Z\",\"deletedAt\":null,\"loan_type_id\":1}"),
    
    ]
}

const item = () => {
    parser("{\"0\":{\"field_name\":\"unit\",\"field_type\":\"Dropdown\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":1,\\\"field_title\\\":\\\"Unit\\\",\\\"field_name\\\":\\\"unit\\\",\\\"field_type\\\":\\\"Dropdown\\\",\\\"possible_values\\\":\\\"Second Hand except Korean, China, Indian, Surplus\\\",\\\"default_value\\\":\\\"Second Hand except Korean\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"1\":{\"field_name\":\"vehicle_description\",\"field_type\":\"Text\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":2,\\\"field_title\\\":\\\"Vehicle Description\\\",\\\"field_name\\\":\\\"vehicle_description\\\",\\\"field_type\\\":\\\"Text\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"2\":{\"field_name\":\"principal_amount\",\"field_type\":\"Number\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":3,\\\"field_title\\\":\\\"Principal Amount (PHP)\\\",\\\"field_name\\\":\\\"principal_amount\\\",\\\"field_type\\\":\\\"Number\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"0\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"3\":{\"field_name\":\"appraised_amount\",\"field_type\":\"Number\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":4,\\\"field_title\\\":\\\"Appraised Amount (PHP)\\\",\\\"field_name\\\":\\\"appraised_amount\\\",\\\"field_type\\\":\\\"Number\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"0\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"4\":{\"field_name\":\"picture_of_vehicle_1\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":5,\\\"field_title\\\":\\\"Picture of Vehicle 1(Odometer)\\\",\\\"field_name\\\":\\\"picture_of_vehicle_1\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"5\":{\"field_name\":\"picture_of_vehicle_2\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":6,\\\"field_title\\\":\\\"Picture of Vehicle 2\\\",\\\"field_name\\\":\\\"picture_of_vehicle_2\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"6\":{\"field_name\":\"picture_of_vehicle_3\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":7,\\\"field_title\\\":\\\"Picture of Vehicle 3\\\",\\\"field_name\\\":\\\"picture_of_vehicle_3\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"7\":{\"field_name\":\"picture_of_vehicle_4\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":8,\\\"field_title\\\":\\\"Picture of Vehicle 4\\\",\\\"field_name\\\":\\\"picture_of_vehicle_4\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"8\":{\"field_name\":\"picture_of_vehicle_5\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":9,\\\"field_title\\\":\\\"Picture of Vehicle 5\\\",\\\"field_name\\\":\\\"picture_of_vehicle_5\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"9\":{\"field_name\":\"picture_of_vehicle_6\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":10,\\\"field_title\\\":\\\"Picture of Vehicle 6\\\",\\\"field_name\\\":\\\"picture_of_vehicle_6\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"10\":{\"field_name\":\"picture_of_vehicle_7\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":11,\\\"field_title\\\":\\\"Picture of Vehicle 7\\\",\\\"field_name\\\":\\\"picture_of_vehicle_7\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"11\":{\"field_name\":\"or\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":12,\\\"field_title\\\":\\\"Original OR\\\",\\\"field_name\\\":\\\"or\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"12\":{\"field_name\":\"cr\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":13,\\\"field_title\\\":\\\"Original CR\\\",\\\"field_name\\\":\\\"cr\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"13\":{\"field_name\":\"set_1_stencil\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":14,\\\"field_title\\\":\\\"Set 1 Stencil\\\",\\\"field_name\\\":\\\"set_1_stencil\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"14\":{\"field_name\":\"set_2_stencil\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":15,\\\"field_title\\\":\\\"Set 2 Stencil\\\",\\\"field_name\\\":\\\"set_2_stencil\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"15\":{\"field_name\":\"set_3_stencil\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":16,\\\"field_title\\\":\\\"Set 3 Stencil\\\",\\\"field_name\\\":\\\"set_3_stencil\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":true,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"16\":{\"field_name\":\"comprehensive_insurance\",\"field_type\":\"File\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":17,\\\"field_title\\\":\\\"Comprehensive Insurance\\\",\\\"field_name\\\":\\\"comprehensive_insurance\\\",\\\"field_type\\\":\\\"File\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"},\"17\":{\"field_name\":\"item_remarks\",\"field_type\":\"Textarea\",\"value\":\"\",\"snapshot\":\"{\\\"id\\\":18,\\\"field_title\\\":\\\"Remarks\\\",\\\"field_name\\\":\\\"item_remarks\\\",\\\"field_type\\\":\\\"Textarea\\\",\\\"possible_values\\\":\\\"-1\\\",\\\"default_value\\\":\\\"-1\\\",\\\"is_required\\\":false,\\\"createdAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"updatedAt\\\":\\\"2022-07-25T02:56:46.000Z\\\",\\\"deletedAt\\\":null,\\\"loan_type_id\\\":1}\"}}")
}

module.exports = {fields, item}