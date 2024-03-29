// const SetVehicleDocument = (propertyName, items) => {

//     let vehicleDocuments = [];

//     vehicleDocuments.push({...vehicleDocuments, [propertyName]: items})

//     return vehicleDocuments
// }

const GetSessionDocument = (propertyName) => {
    return JSON.parse(sessionStorage.getItem(propertyName));
}

const MakeRed = (docName) => {
    if (docName && docName.imageName === "") {
      return "makeRed"
    }else{
        return ""
    }
}

const CheckSessionStorage = () => {

    let isComplete;

    for (let index = 0; index < sessionStorage.length; index++) {
        const getSession = sessionStorage.key(index);
        const getItem = sessionStorage.getItem(getSession);

        return isComplete = false
    }

    return isComplete
}

const GetCookieByName = (cookieName) => {
    const cookies = document.cookie.split(`;`);

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + "=")) {

            let cookieValue = cookie.replace(`${cookieName}=`, "");

            return JSON.parse(decodeURIComponent(cookieValue));
        }
    }

    return null;
}

const LoanTypes = [ "Housing Loan" ]

const LoanTypeChecker = (loantype) => {
    return LoanTypes.includes(loantype);
}

const CapitalizeString = (word) => {

    return !word ? word : word.charAt(0).toUpperCase() + word.slice(1);
}

const ToDecimal = (number) => {

    const isTwoDecimal = /\d\.\d{2}$/
    const isOneDecimal = /\d\.\d{1}$/   

    return typeof(number) === "number" ? isOneDecimal.test(number) || isTwoDecimal.test(number)
            ? number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
            : Number(number).toLocaleString(undefined, { minimumFractionDigits: 2,
                maximumFractionDigits: 2 })
            : Number(number).toLocaleString(undefined, { minimumFractionDigits: 2,
                maximumFractionDigits: 2 });

    // return typeof(val) === "number" ? isOneDecimal.test(val) || isTwoDecimal.test(val)
    //         ? val.toLocaleString(undefined, { useGrouping: true }) 
    //         : val.toLocaleString(undefined, { useGrouping: true }).concat(".00")
    //         : val ;
}

export {
    GetSessionDocument,
    MakeRed,
    CheckSessionStorage,
    GetCookieByName,
    LoanTypeChecker,
    CapitalizeString,
    ToDecimal
}