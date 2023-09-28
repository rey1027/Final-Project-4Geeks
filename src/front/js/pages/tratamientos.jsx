import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/services.css";
import ServiceCard from "../component/cardservices";
import chequeo from "../../img/chequeo-dental.png";
import endodoncia from "../../img/endodoncia.png";
import Opediatra from "../../img/odontopediatria.png";
import ortodoncia from "../../img/ortodoncia.png";
import LimpiezaD from "../../img/limpiezadental.png";
import implanteD from "../../img/implante-dental.png";
import extraccion from "../../img/extraccion.png";
import periodoncia from "../../img/periodoncia.png";
import carillas from "../../img/carillas.png";
import especialista from "../../img/especialista.png";

export const Tratamientos = (props) => {
  const imagenesTratamientos = [
    chequeo,
    endodoncia,
    Opediatra,
    ortodoncia,
    LimpiezaD,
  ];
  const imagenesTratamientos2 = [
    implanteD,
    extraccion,
    periodoncia,
    carillas,
    especialista,
  ];
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerTratamientos();
  }, []);
  console.log(store.tratamientos);
  return (
    <>
      <div className="FondoD jumbotron justify-content-center align-items-center ">
        <div className="row row-cols-3 row-cols-md-3 g-3 justify-content-center justify-items-center ">
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
        <div className="row row-cols-3 row-cols-md-3 g-3 justify-content-center align-items-center ">
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

        {/* <Link to="/especialidades">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Especialidades
          </span>
        </Link> */}
      </div>
    </>
  );
};

Tratamientos.propTypes = {
  match: PropTypes.object,
};

export default Tratamientos;
