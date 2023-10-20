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
  
        // if (getItem) {
            
        // }


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

export {
    GetSessionDocument,
    MakeRed,
    CheckSessionStorage,
    GetCookieByName
}