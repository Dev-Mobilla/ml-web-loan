import React from 'react';
import "../../styles/footer.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
          <img
            className="reserved"
            alt="Reserved"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/screenshot-2023-05-31-101930-1.png"
          />
          <img
            className="aboutus"
            alt="Aboutus"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/screenshot-2023-05-31-102020-1@2x.png"
          />
          <img
            className="privacynotice"
            alt="Privacynotice"
            src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/screenshot-2023-05-31-102043-1@2x.png"
          />
        </footer>
  )
}

export default FooterComponent;