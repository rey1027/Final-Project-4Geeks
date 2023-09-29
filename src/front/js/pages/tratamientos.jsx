import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/services.css";
import ServiceCard from "../component/cardservices";
import pulpotomía from "../../img/pulpotomía.jpg";
import limpieza from "../../img/limpieza.jpg";
import frenillos from "../../img/frenillos.jpg";
import alineadores from "../../img/alineadores.jpg";
import calza from "../../img/calza.jpg";
import implante from "../../img/implante.jpg";
import extraccion from "../../img/extraccion_molar.jpg";
import placas from "../../img/placas.jpg";
import cirugia from "../../img/cirugía.jpg";
import protesis from "../../img/protesis1.jpg";

export const Tratamientos = (props) => {
  const imagenesTratamientos = [
    pulpotomía,
    limpieza,
    frenillos,
    alineadores,
    calza,
  ];
  const imagenesTratamientos2 = [
    implante,
    placas,
    extraccion,
    cirugia,
    protesis,
  ];
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerTratamientos();
  }, []);
  console.log(store.tratamientos);
  return (
    <>
      <div className="FondoD jumbotron justify-content-center align-items-center mt-3 pb-5">
        <div className="row row-cols-3 row-cols-md-3 g-3 justify-content-center justify-items-center mb-4 ">
          {store.tratamientos.slice(0, 5).map((item, i) => (
            <ServiceCard
              key={i}
              id={item.id}
              title={item.nombre}
              image={imagenesTratamientos[i]}
              description={item.descripcion}
              price={item.precio}
            />
          ))}
        </div>
        <br />
        <div className="row row-cols-3 row-cols-md-3 g-3 justify-content-center align-items-center">
          {store.tratamientos.slice(5, 10).map((item, i) => (
            <ServiceCard
              key={i}
              id={item.id}
              title={item.nombre}
              image={imagenesTratamientos2[i]}
              description={item.descripcion}
              price={item.precio}
            />
          ))}
        </div>
      </div>
    </>
  );
};

Tratamientos.propTypes = {
  match: PropTypes.object,
};

export default Tratamientos;
