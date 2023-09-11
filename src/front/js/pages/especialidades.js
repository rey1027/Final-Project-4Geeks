import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Especialidad = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		
			
		<div className="jumbotron justify-content-center align-items-center ">
    {store.demo[params.theid].title}
			<h1>Hola soy especialidades</h1>
			
		
			
		</div>
		
		
	);
};

Especialidad.propTypes = {
	match: PropTypes.object
};
