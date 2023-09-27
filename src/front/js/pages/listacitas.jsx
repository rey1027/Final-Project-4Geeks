import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import fondo from "../../img/bgcitas3.png";
import "../../styles/citas.css";

//create your first component
const LCitas = (props) => {
  const { store, actions } = useContext(Context);
  console.log(store.citas);
  useEffect(() => {
    actions.obtenerCitas();
  }, []);
  const [citas, setCitas] = useState("");
  const [lista, setLista] = useState([]);

  return (
    <>
      <div className="paper containercitas text-center justify-content-center justify-items-center">
        {store.citas && store.citas.length > 0 ? (
          <>
            {store.citas.map((item, i) => {
              return (
                <li className="lista text-center list-group-item" key={i}>
                  <div className="list-group">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action cardfondo"
                      aria-current="true"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.nombre}</h5>
                        <small>Fecha Cita: {item.fecha}</small>
                      </div>
                      <p className="mb-1">
                        Tratamiento: {item.tratamiento} <br /> Especialista:{" "}
                        {item.especialista}
                        <br />
                        <small>Hora De La Cita : {item.hora}</small>
                      </p>

                      <button
                        className="botonX"
                        type="button"
                        onClick={() => {
                          actions.eliminarCita(item.id);
                        }}
                      >
                        <p>
                          <small className="eliminar">cancelar cita</small>
                        </p>
                      </button>
                    </a>
                  </div>
                </li>
              );
            })}
          </>
        ) : (
          "la lista está vacía"
        )}
        <p className="agregado">citas canceladas {store.citas.length}</p>
      </div>
    </>
  );
};

export default LCitas;
