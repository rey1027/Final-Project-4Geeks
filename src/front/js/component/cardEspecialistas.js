import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Agrega esta línea
import "../../styles/especialistas.css";
import { Context } from "../store/appContext";
const CardEspecialistas = ({ especialista }) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="col col-lg-4 col-sm-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-start">{especialista.nombre}</h5>
          <br />
          <h6 className="card-subtitle mb-2 text-muted">
            {especialista.codigo_profesional}
          </h6>
          <h6 className="card-text text-start mt-2">
            {especialista.nombre_de_especialidad}
          </h6>
          <br />
          <h6 className="card-subtitle text-end mb-2 text-muted">
            {especialista.años_experiencia} años
          </h6>
          <button
            className="text-center myButtonC"
            data-bs-toggle="modal"
            data-bs-target={"#especialista-" + especialista.id}
            style={{ position: "absolute", bottom: "0" }}
          >
            Conóceme
          </button>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={"especialista-" + especialista.id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {especialista.nombre}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{especialista.perfil_profesional}</div>
            <div className="modal-footer">
              <button type="button" className="cerrar" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardEspecialistas.propTypes = {
  especialista: PropTypes.object,
};

export default CardEspecialistas;
