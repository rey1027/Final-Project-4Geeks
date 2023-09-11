import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/services.css";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/services.css";
import ServiceCard from "./cardservices";
import chequeo from "../../img/chequeo-dental.png";
import endodoncia from "../../img/endodoncia.png";
import Opediatra from "../../img/odontopediatria.png";
import ortodoncia from "../../img/ortodoncia.png";
import LimpiezaD from "../../img/limpiezadental.png";
import implanteD from "../../img/implante-dental.png";
import extraccion from "../../img/extraccion.png";
import periodoncia from "../../img/periodoncia.png";
import carillas  from "../../img/carillas.png";
import especialista  from "../../img/especialista.png";
export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<>
			{store.demo[params.theid].title}
		<div className="jumbotron justify-content-center align-items-center ">
    
			<div class="row row-cols-3 row-cols-md-3 g-3 justify-content-center justify-items-center ">
			
      <ServiceCard
          title="Chequeo Dental"
          image={chequeo}
          description="Un chequeo dental, también conocido como revisión dental o examen oral..."
        />
        <ServiceCard
          title="Endodoncia"
          image={endodoncia}
          description="La endodoncia es un procedimiento odontológico especializado diseñado para tratar problemas..."
        />
        <ServiceCard
          title="Odontopediatra"
          image={Opediatra}
          
          description="Un chequeo dental, también conocido como revisión dental o examen oral..."
        />
        <ServiceCard
          title="Ortodoncia"
          image={ortodoncia}
          description="La endodoncia es un procedimiento odontológico especializado diseñado para tratar problemas..."
        />
        <ServiceCard
          title="Limpieza Dental"
          image={LimpiezaD}
          description="Un chequeo dental, también conocido como revisión dental o examen oral..."
        />
       
</div>
<br/>
<div class="row row-cols-3 row-cols-md-3 g-3 justify-content-center align-items-center ">

    <ServiceCard
          title="Implantes Dentales"
          image={implanteD}
          description="Un chequeo dental, también conocido como revisión dental o examen oral..."
        />
        <ServiceCard
          title="Cirugia De Cordales"
          image={extraccion}
          description="La endodoncia es un procedimiento odontológico especializado diseñado para tratar problemas..."
        />
        <ServiceCard
          title="Periodoncia Dental"
          image={periodoncia}
          description="Un chequeo dental, también conocido como revisión dental o examen oral..."
        />
        <ServiceCard
          title="Carillas-Resinas Dentales"
          image={carillas}
          description="La endodoncia es un procedimiento odontológico especializado diseñado para tratar problemas..."
        />
        <ServiceCard
        title="Medicos Especialistas"
        image={especialista}
        description="Un chequeo dental, también conocido como revisión dental o examen oral..."
        
      />.
      
        {/* Agrega más ServiceCard para otros servicios */}
      
	</div>
			
		
			<Link to="/Especialidad">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Especialidades
				</span>
			</Link>
		</div>
		
		</>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
