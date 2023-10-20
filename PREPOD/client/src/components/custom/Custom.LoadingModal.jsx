import React from 'react'

const CustomLoadingModal = ({ loadingText, loadingIcon }) => {
  return (
    <div className="modal-loading--wrapper">
        <div className="modal-loading--container">
            <div className="modal-loading--content">
                <p className="modal-loading--text">
                   { loadingText }
                </p>
                <div className='modal-loading--circle'>
                    { loadingIcon} 
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomLoadingModal;