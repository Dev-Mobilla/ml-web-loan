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
const fetchBranch = async () => {
    try {
        const response = await fetch('http://nana.mlhuillier.net:8000/getSheets');
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error:', error);
    }
};

export {
    GetLoansDetails,
    fetchBranch
}