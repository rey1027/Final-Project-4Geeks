import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/registro.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate(""); //

  const register = async () => {
    if (email == "" && cedula == "" && nombre == "" && edad == "") {
      Swal.fire({
        icon: "warning",
        title: "Cuidado!",
        text: "Debes completar todos los espacios ",
        timer: 3500,
      });
    }
    if (password == "") {
      Swal.fire({
        icon: "warning",
        title: "Cuidado!",
        text: "Debes ingresar la contraseña",
        timer: 3500,
      });
      return;
    }

    let obj = {
      email: email,
      password: password,
      nombre_completo: nombre,
      cedula: cedula,
      edad: edad,
    };

    let response = await actions.fetchPromise("/api/registrar", "POST", obj);

    if (response.ok) {
      let responseJson = await response.json();
      console.log(responseJson);
      Swal.fire({
        position: "center",
        icon: "success",
        title: responseJson.message,
        timer: 3500,
      });
      navigate("/inicio-sesion"); //Ruta a la que queremos ir
    } else {
      let responseJson = await response.json();
      console.log(responseJson);
      Swal.fire({
        icon: "error",
        title: responseJson.message,
        text: "Error al registrar el usuario!",
        timer: 3500,
      });
    }
    return;
  };

  return (
    <>
      <div className="General container-fluid">
        <br />
        <div className="PaginaR">
          <div className="row d-flex justify-content-center">
            <h1 className="d-flex justify-content-center tituloR ">
              Registro de Usuario
            </h1>
          </div>
          <div className="mb-3 row">
            <div className="col-3"></div>
            <label
              htmlFor="inputName"
              className="col-sm-2 col-form-label text-start atributos "
            >
              <b className="text-start">Nombre</b>
            </label>
            <div className="col-sm-5">
              <input
                className="form-control"
                id="inputName"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                placeholder="Nombre Completo"
              />
            </div>
            <div className="col-2"></div>
          </div>

          <div className="mb-3 row">
            <div className="col-3"></div>
            <label
              htmlFor="inputId"
              className="col-sm-2 col-form-label text-end atributosR "
            >
              <b>Cédula</b>
            </label>
            <div className="col-sm-5">
              <input
                className="form-control"
                id="inputId"
                onChange={(e) => {
                  setCedula(e.target.value);
                }}
              />
            </div>
            <div className="col-2"></div>
          </div>

          <div className="mb-3 row">
            <div className="col-3"></div>
            <label
              htmlFor="inputAge"
              className="col-sm-2 col-form-label atributosR text-end"
            >
              <b> Edad</b>
            </label>
            <div className="col-sm-5">
              <input
                className="form-control"
                id="inputAge"
                onChange={(e) => {
                  setEdad(e.target.value);
                }}
              />
            </div>
            <div className="col-2"></div>
          </div>

          <div className="mb-3 row">
            <div className="col-3"></div>
            <label
              htmlFor="inputEmail"
              className="col-sm-2 col-form-label text-start atributosR text-end"
            >
              <b>Email</b>
            </label>
            <div className="col-sm-5">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="col-3"></div>
          </div>
          <div className="mb-3 row">
            <div className="col-2"></div>
            <label
              htmlFor="inputPassword"
              className="col-3 text-center col-form-label atributosR"
            >
              <b>Contraseña</b>
            </label>
            <div className="col-sm-5">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row ">
            <div className="col-lg-4 col-sm-3"></div>
            <div className="col-lg-4 col-sm-6 d-flex justify-content-center">
              <button
                type="button"
                className="btn botonRRe "
                onClick={register}
              >
                <b>Crear Usuario</b>
              </button>
            </div>
            <div className="col-lg-4 col-sm-3"></div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Registrar;