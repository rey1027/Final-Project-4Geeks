import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Agrega esta línea
import "../../styles/especialistas.css";
const CardEspecialistas = ({especialista}) => {


  return (
    <div className="Card">
      <div className="RowCards">
        <div className="card rounded">
          <div className="card-body">
          <h5 className="card-title text-start">{especialista.nombre}</h5>
          <br/>
          <h6 className="card-subtitle mb-2 text-muted">Experiencia: {especialista.años_experiencia} años</h6>
          <br/>
          <p className="card-text text-start">{especialista.perfil_profesional}</p>
          <br/>
          <h6 className="Code mb-2 text-muted">Código: {especialista.codigo_profesional}</h6>
          <br/>
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
