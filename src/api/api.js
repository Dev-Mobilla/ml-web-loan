import { Loans } from "../utils/ManageLoansMockData";

const GetLoansDetails = async (loanId) => {
    try {

        let loan = Loans.filter((item, key) => {

            if (loanId === item.loanId) {
                return item;
            }
        })

        return loan;
    } catch (error) {
        console.log(error);
    }
}

export {
    GetLoansDetails

}