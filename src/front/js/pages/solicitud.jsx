import React, { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/solicitud.css";
import Swal from "sweetalert2";

export const Citas = () => {
  const { store, actions } = useContext(Context);
  const inputNombre = useRef(store.nombre)
  const inputDate = useRef()
  const inputTime = useRef()
  const inputEspecialidades = useRef()
  const inputEspecialistas = useRef()
  const inputTratamientos = useRef()
  const [especialidades, setEspecialidades] = useState([])
  const [especialistas, setEspecialistas] = useState([])
  const [tratamientos, setTratamientos] = useState([])
  const [msjEspecialidad, setMsjEspecialidad] = useState("-- Selecione una especialidad primero --")
  const [msjTratamiento, setMsjTratamiento] = useState("-- Selecione un especialista primero --")

  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinute = Math.floor(now.getMinutes() / 30) * 30;
  const formattedMinute = currentMinute.toString().padStart(2, '0');  
  const currentTime = `${currentHour}:${formattedMinute}`;

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await actions.fetchPromise("/api/especialidades", "GET");
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error al obtener especialidades:", error);
      }
    };
  
    fetchEspecialidades();
  }, []);

    const handleEspecialidadChange = async (event) => {
      const especialidad = event.target.value
      if (especialidad != "") {
        let data = await actions.fetchPromise(`/api/especialistas/especialidad/${especialidad}`, "GET");
        setEspecialistas(await data.json())
        if (especialistas.length == 0) {
          setMsjEspecialidad("-- No hay especialidad asociada --")
        }
        setTratamientos([])
        setMsjTratamiento("-- Selecione un especialista primero --")
      } else {
        setEspecialistas([])
        setTratamientos([])
        setMsjEspecialidad("-- Selecione una especialidad primero --")
        setMsjTratamiento("-- Selecione un especialista primero --")
      }
    };

    const handleEspecialistaChange = async (event) => {
      const especialista = event.target.value
      if (especialista != "") {
        let data = await actions.fetchPromise(`/api/tratamientos/especialista/${especialista}`, "GET");
        setTratamientos(await data.json())
        if (tratamientos.length == 0) {
          setMsjTratamiento("-- No hay especialista asociado --")
        }
      } else {
        setTratamientos([])
        setMsjTratamiento("-- Selecione un especialista primero --")
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      let obj = {
        nombre: inputNombre.current,
        fecha: inputDate.current.value,
        hora: inputTime.current.value,
        especialidad_id: inputEspecialidades.current.value,
        especialistas_id: inputEspecialistas.current.value,
        tratamientos_id: inputTratamientos.current.value
      };
  
      let response = await actions.fetchPromise(
        "/api/citas",
        "POST",
        obj
      );
  
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cita creada exitósamente",
          text:`Recuerde su cita el día ${inputDate.current.value} a las ${inputTime.current.value}`
        });

        inputDate.current.value = ""
        inputTime.current.value = ""
        inputEspecialidades.current.value = ""
        setEspecialistas([])
        setTratamientos([])
        setMsjEspecialidad("-- Selecione una especialidad primero --")
        setMsjTratamiento("-- Selecione un especialista primero --")

      } else {
        Swal.fire({
          icon: "error",
          title:"Error",
          text: "Error en la creación de la cita",
          timer: 2500,
        });
      }

    };

  return store.current_user ? store.current_user.rol == "user" ?(
    <form className="needs-validation" onSubmit={handleSubmit} novalidate>
      <div className="Registro">
        <div className="row d-flex justify-content-center">
          <h1 className="d-flex justify-content-center titulo ">
            Registre su cita
          </h1>
        </div>
        <div className="mb-3 row">
          <div className="col-4"></div>
          <label className="col-sm-1 col-form-label atributos ">
            <b>Nombre</b>
          </label>
          <div className="col-sm-4">
            <input
              className="form-control"
              id="inputName"
              value={store.current_user.nombre_completo}
              disabled
            />
          </div>
          <div className="col-3"></div>
        </div>

        <div className="mb-3 row">
          <div className="col-4"></div>
          <label className="col-sm-1 col-form-label atributos ">
            <b>Fecha</b>
          </label>
          <div className="col-sm-4">
            <input
              className="form-control"
              id="inputDate"
              type="date"
              ref={inputDate}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="col-3"></div>
        </div>

        <div className="mb-3 row">
          <div className="col-4"></div>
          <label className="col-sm-1 col-form-label atributos ">
            <b> Hora</b>
          </label>
          <div className="col-sm-4">
            <input
              className="form-control"
              id="inputHora"
              type="time"
              step="1800"
              min={currentTime}
              ref={inputTime}
              required
            />
          </div>
          <div className="col-3"></div>
        </div>

        <div className="mb-4 row">
          <div className="col-4"></div>
          <label className="col-sm-1 col-form-label atributos">
            <b>Especialidad</b>
          </label>
          <div className="col-sm-4">
          <select className="form-select" onChange={handleEspecialidadChange} required
          ref={inputEspecialidades}>
            <option value=""> -- Seleccione una especialidad -- </option>
            {
              especialidades.map(x => {
                return <option value={x.id}>{x.nombre}</option>
              })
            }
          </select>
          </div>
          <div className="col-2"></div>
        </div>

        <div className="mb-3 row">
          <div className="col-4"></div>
          <label className="col-sm-1 col-form-label atributos">
            <b>Especialista</b>
          </label>
          <div className="col-sm-4">
          <select className="form-select" onChange={handleEspecialistaChange} required
          ref={inputEspecialistas}>
            {
              especialistas.length == 0 ?
              <option value=""> {msjEspecialidad} </option> :
              <><option value=""> -- Seleccione un especialista -- </option>
              {
                  especialistas.map(x => {
                    return <option value={x.id}>{x.nombre}</option>
                  })
                }
                </>
            }
          </select>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="mb-3 row">
          <div className="col-4"></div>
          <label
            className="col-sm-1 col-form-label atributos "
          >
            <b>Tratamiento</b>
          </label>
          <div className="col-sm-4">
          <select className="form-select" required
          ref={inputTratamientos}>
          {
              tratamientos.length == 0 ?
              <option value=""> {msjTratamiento} </option> :
              <><option value=""> -- Seleccione un tratamiento -- </option>
              {
                  tratamientos.map(x => {
                    return <option value={x.id}>{x.nombre}</option>
                  })
                }
                </>
            }
          </select>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row ">
          <div className="col-lg-5 col-sm-3"></div>
          <div className="col-lg-2 col-sm-6 d-flex justify-content-center">
            <button
              type="submit"
              className="btn botonRR fs-5"
            >
              <b>Crear Cita</b>
            </button>
          </div>
          <div className="col-lg-5 col-sm-3"></div>
        </div>
      </div>
    </form>
  ) 
  : 
  (
    <div className="text-center mt-5">
      <h1>Esta página es solo para Usuarios</h1>
    </div>
  )
  :
  (
    <div className="text-center mt-5">
      <h1>Debes iniciar sesión para visualizar la página</h1>
    </div>
  );
  
};

export default Citas;
