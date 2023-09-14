import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/especialistas.css";
import ServiceCard from "../component/cardservices";
import CardEspecialistas from "../component/cardEspecialistas.js"


export const Especialistas = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <>
      <div className="jumbotron">
        <div className="Card row row-cols-4 row-cols-md-4 g-3 justify-content-center justify-items-center">
          {store.especialistas.map((item)=>{
            return(
              <CardEspecialistas especialista ={item} key={item.id}/>
            )
          })}
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
