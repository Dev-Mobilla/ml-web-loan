import React from "react";
import { PreviousBTNComponent } from '../index';

const CustomPrevBtn = () => {
  return (
    <div className="custom-prevbtn prevpagebtn">
      <PreviousBTNComponent>
      <img
        className="arrow"
        alt="Arrow"
        src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e5956d9f04124e98dc5ac7/img/arrow-2@2x.png"
      />
      </PreviousBTNComponent>
    </div>
  );
};

export default CustomPrevBtn;
