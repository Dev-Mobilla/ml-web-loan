import "../../styles/customcomponent.css";

const CustomAlert = (props) => {
    const { title, text, isError, onClose, subtitle } = props;

    const handleButtonClick = () => {
        onClose();
      };

    return (
        <div className="alert-modal">
            <div className="modalBackground">
                <div className="modal-content">
                    <div className="modal-body">
                        <h4 id="title-alert">{title}</h4>
                        <p id="text-alert">{text}</p>
                        <p style={{ margin: '0px 0px 20px 0px' }}>{subtitle ? subtitle : ""}</p>
                        {isError &&
                            <button id="Ok-btn" onClick={handleButtonClick}>Ok</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomAlert;
