import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/especialistas.css";
import CardEspecialistas from "../component/cardEspecialistas.js"


export const Especialistas = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <> 
    <div className="container-fluid">
      <div className="row">
        <div className="Card row row-cols-lg-4 justify-content-center justify-items-center mb-3">
          {store.especialistas.map((item)=>{
            return(
              <CardEspecialistas className="col-lg-4" especialista ={item} key={item.id}/>
            )
          })}
        </div>

         {/* <Link to="/especialidades">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Especialidades
          </span>
        </Link> */}
      </div>
      </div>
    </>
  );
};

Especialistas.propTypes = {
  match: PropTypes.object,
};

export default Especialistas;
