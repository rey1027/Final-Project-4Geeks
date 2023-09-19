import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Agrega esta línea
import "../../styles/especialistas.css";
const CardEspecialistas = ({especialista}) => {
  


  return (
      <div>
        {especialista.nombre}
        <br/>
        {especialista.perfil_profesional}
      </div>
  );
};

CardEspecialistas.propTypes = {
  especialista: PropTypes.object,

};

export default CardEspecialistas;
