const SliceIMageName = (imageName) => {

    let splitString = imageName.split(".");
    let imgExt = splitString[1];
    let splitImgName = splitString[0];

    let slicedImgName = splitImgName.slice(0, 13)

    return imageName.length > 10 ? slicedImgName + "..." + " " + "." + imgExt : imageName;
  }

  export{
    SliceIMageName
  }