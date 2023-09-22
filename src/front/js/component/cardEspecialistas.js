import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Agrega esta línea
import "../../styles/especialistas.css";
const CardEspecialistas = ({ especialista }) => {
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
          <a
            href="#"
            className="text-center"
            style={{ position: "absolute", bottom: "0" }}
          >
            Conoceme
          </a>
        </div>
      </div>
    </div>
  );
};

CardEspecialistas.propTypes = {
  especialista: PropTypes.object,
};

export default CardEspecialistas;
