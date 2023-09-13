import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/especialistas.css";
import ServiceCard from "../component/cardservices";


export const Especialistas = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <>
      <div className="jumbotron justify-content-center align-items-center "> holaa
        <div className="row row-cols-3 row-cols-md-3 g-3 justify-content-center justify-items-center ">
          <ServiceCard
            name=""
            experencia=""
            perfil=""
            codigo=""
            especialidad=""
          />
          <ServiceCard
             name=""
             experencia=""
             perfil=""
             codigo=""
             especialidad=""
          />
          <ServiceCard
             name=""
             experencia=""
             perfil=""
             codigo=""
             especialidad=""
          />
          <ServiceCard
             name=""
             experencia=""
             perfil=""
             codigo=""
             especialidad=""
          />
          <ServiceCard
            name=""
            experencia=""
            perfil=""
            codigo=""
            especialidad=""
          />
        </div>
        <br />
        <div className="row row-cols-3 row-cols-md-3 g-3 justify-content-center align-items-center ">
          <ServiceCard
            name=""
            experencia=""
            perfil=""
            codigo=""
            especialidad=""
          />
          <ServiceCard
            name=""
            experencia=""
            perfil=""
            codigo=""
            especialidad=""
          />
          <ServiceCard
             name=""
             experencia=""
             perfil=""
             codigo=""
             especialidad=""
          />
          <ServiceCard
             name=""
             experencia=""
             perfil=""
             codigo=""
             especialidad=""
          />
          <ServiceCard
             name=""
             experencia= ""
             perfil=""
             codigo=""
             especialidad=""
          />
          .{/* Agrega más ServiceCard para otros servicios */}
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

Especialistas.propTypes = {
  match: PropTypes.object,
};

export default Especialistas;
