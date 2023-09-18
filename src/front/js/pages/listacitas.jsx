import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/citas.css";
//create your first component
const Citas = (props) => {
	const { store, actions } = useContext(Context);
	useEffect(()=>{
		actions.obtenerCitas();
	  }, [])
	  console.log(store.listacitas);
	const [citas, setCitas] = useState("")
	const [lista, setLista] = useState(["Cita Odontología General", "Cita En Odontopediatría","Cita De Ortodoncia","Cita De Extracción De Cordales"])

	const handleInput = (e) => {
		let texto = e.target.value
		if (e.keyCode == 13) {
			setCitas(texto)
			//Una primera aproximación para agregar a la lista es usando una variable auxiliar
			//let tempArr = lista.slice() //copia de arreglo por valor
			//tempArr.push(texto)
			//setLista(tempArr)

			//Una segunda aproximación es usando el operador spread ...
			setLista([...lista, texto])
		}
	}

	const deleteCita = (index) => { 
		let tempArr = lista.slice() //copiar el estado lista en una variable auxiliar
		tempArr = tempArr.filter((item, index2) => { return index2 != index })
		setLista(tempArr)
	}
	
	return (
		<>
        <div className="paper containercitas text-center justify-content-center justify-items-center">
		
					<div className=" nota ">
			<ul className="list-group">
			<p className=" lista3 titulotodos ">citas próximas</p>
			<input className=" lista2 list-group-item text-center" type="text reset"   placeholder="Escriba aquí"
					onKeyUp={
						(e) => { handleInput(e) }
					} />
					
			{
						lista && lista.length > 0 ?
							<>{
								lista.map((item, index) => {
									return <li className="lista text-center list-group-item" key={index}>
										{item}
										<button className="botonX" type="button" onClick={e => { deleteCita(index) }}>
											<p className="eliminar">X</p>
										</button>
									</li>
								})
							}</>
							: "la lista está vacía"
					}
					
			</ul>
			</div>
				<p className="agregado">items left  {lista.length}</p> 
			</div>
			 
			
			
			
		</>
	);
};

export default Citas;