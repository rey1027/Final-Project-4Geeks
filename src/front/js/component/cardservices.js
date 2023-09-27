import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Agrega esta línea
const ServiceCard = ({ title, image, description, price, id, linkTo }) => {
  return (
    <div className="col">
      <div className="card h-100 justify-content-center justify-items-center">
        <img src={image} className="card-img " alt={title} />
        <div className="card-body justify-content-center justify-items-center">
          <div className="text-wrap">
            <h5 className="card-title ">{title}</h5>
          </div>
          <p className="card-text">
            <br />

            <button
              type="button"
              className="btn btn-primary boton"
              data-bs-toggle="modal"
              data-bs-target={"#cardservice-" + id}
              //data-bs-target={`modal${data.id}`}
              //onClick={handleModalToggle}
              // onClick={() => {
              //   actions.obtenerTratamientos(data.id);
              // }}
            >
              Saber más
            </button>
          </p>
          {/* {showModal && ( */}

          {/* )} */}
        </div>
      </div>
      <div
        className="modal fade justify-content-center justify-items-center"
        id={"cardservice-" + id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header d-flex justify-content-center">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
              <button
                type="button "
                data-bs-dismiss="modal"
                className="btn-close "
                //onClick={handleModalToggle}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center ">
              <p>{description}</p>
              <p className="text-secondary fw-bold text-start">
                {" "}
                precio ${price}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                // onClick={handleModalToggle}
              >
                Close
              </button>
            </div>
          </div>
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
