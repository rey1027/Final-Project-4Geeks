import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ServiceCard = ({ title, image, description }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col">
      <div className="card h-100 justify-content-center justify-items-center">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body justify-content-center justify-items-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <br />
            <p>Quieres saber mas ?</p>
            <button
              type="button"
              className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
              onClick={handleModalToggle}
            >
              click me
            </button>
          </p>
          {showModal && (
            <div
              className="modal fade justify-content-center justify-items-center" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true"
              tabIndex="-1"
             
            >
              <div className="modal-dialog">
                <div className="modal-content justify-content-center justify-items-center">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      {title}
                    </h5>
                    <button
                      type="button " data-bs-dismiss="modal"
                      className="btn-close" 
                      onClick={handleModalToggle}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">{description}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                      onClick={handleModalToggle}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ServiceCard;
