import { pastLoans, currentLoans } from "../utils/ManageLoansMockData";

const GetLoansDetails = async (ref, type) => {
    try {

        let loan = currentLoans.filter((item, key) => {
            let loanType = item.loanType.toLowerCase().replaceAll(" ", "-");
            console.log(loanType);

            if (loanType === type && item.referenceNo === ref) {
                return item;
            }
        })

        return loan[0];
    } catch (error) {
        console.log(error);
    }
}


export {
    GetLoansDetails

}