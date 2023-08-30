import React from 'react';
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

export default FooterComponent;