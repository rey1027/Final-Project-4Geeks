import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Agrega esta línea
const ServiceCard = ({ title, image, description, price, id, linkTo }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);

  };

  return (
    <div className="col">
      <div className="card h-100 justify-content-center justify-items-center">
        <img src={image} className="card-img " alt={title} />
        <div className="card-body justify-content-center justify-items-center">
          <div className="text-wrap"><h5 className="card-title ">{title}</h5></div>
          <p className="card-text">
            <br />

            <button
              type="button"
              className="btn btn-primary boton"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleModalToggle}

            >
              Saber más

            </button>
          </p>
          {showModal && (
            <div
              className="modal fade justify-content-center justify-items-center"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
              tabIndex="-1"
            >
              <div className="modal-dialog">
                <div className="modal-content justify-content-center justify-items-center">
                  <div className="modal-header">
                    <h5 className="modal-title text-wrap" id="staticBackdropLabel">
                      {title}
                    </h5>
                    <button
                      type="button " data-bs-dismiss="modal"
                      className="btn-close "
                      onClick={handleModalToggle}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-center "><p>{description}</p>
                    <p className="text-secondary fw-bold text-start"> precio ${price}</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
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
