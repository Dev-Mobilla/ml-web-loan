import React from "react";
import "../../styles/footer.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="column-1">
        <p className='reserved'>Copyright © 2023 MLhuillier Financial Services, Inc. <br/>All Rights Reserved.</p>
      </div>
      <div className="column-2">
        <a href='#' className="aboutus">About Us</a>
        <a href='#' className="privacynotice">Privacy Notice</a>
      </div>
    </footer>
  )
}
      <div className="footer-content">
        <div className="left-side">
          Copyright &copy; 2023 Financial Services, Inc. All Rights Reserved
        </div>
        <div className="right-side">
          <a href="/">About Us</a> &nbsp;&nbsp; <a href="/">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
export default FooterComponent;
