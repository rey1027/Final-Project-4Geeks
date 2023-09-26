import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
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
      <div className="container-fluid caja">
        <div className="paper containercitas">
          <div className="nota">
            <ul className="list-group">
              <p className="titulotodos fst-italic ">Próximas Citas:</p>
              {/* <input className="list-group-item text-center" type="text reset" /> */}

              {store.citas && store.citas.length > 0 ? (
                <>
                  {store.citas.map((item, i) => {
                    return (
                      <li
                        className="lista text-center list-group-item shadow-lg p-3 mb-5 bg-body rounded"
                        key={i}
                      >
                        <div className=""></div>
                        <div className="list-group">
                          <a
                            className="list-group-item list-group-item-action citaS"
                            aria-current="true"
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1 fst-italic">
                                <strong>{item.nombre}</strong>
                              </h5>
                              <small>
                                <strong>Fecha: {item.fecha}</strong>
                              </small>
                            </div>
                            <p className="mb-1">
                              Tratamiento: {item.tratamiento} <br />{" "}
                              Especialista: {item.especialista}
                              <br />
                              <small>Hora: {item.hora}</small>
                            </p>

                            <button
                              className="CancelarC"
                              type="button"
                              onClick={() => {
                                actions.eliminarCita(item.id);
                              }}
                            >
                              <i class="fa-solid fa-trash-can"></i>
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
            </ul>
          </div>
          <p className="agregado">Citas canceladas {store.citas.length}</p>
        </div>
      </div>
    </>
  );
};

export default LCitas;
