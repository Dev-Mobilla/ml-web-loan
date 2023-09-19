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

    let isComplete = false;

    for (let index = 0; index < sessionStorage.length; index++) {
        const getSession = sessionStorage.key(index);
  
        console.log(sessionStorage.getItem(getSession));
        return isComplete = false
    }

    return isComplete
}

export {
    GetSessionDocument,
    MakeRed,
    CheckSessionStorage
}