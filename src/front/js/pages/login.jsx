import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate(""); //

  const login = async () => {
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
    };

    let response = await actions.fetchPromise(
      "/api/inicio-sesion",
      "POST",
      obj
    );

    if (response.ok) {
      let responseJson = await response.json();
      console.log(responseJson);
      actions.setName(responseJson.nombre);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicio sesión correctamente",
        timer: 2500,
      });
      localStorage.setItem("token", responseJson.token);
      actions.activateLoginConfirmation();
      actions.setCurrentUser(responseJson.user);
      navigate("/"); //Ruta a la que queremos ir
    } else {
      let responseJson = await response.json();
      console.log(responseJson);
      Swal.fire({
        icon: "error",
        title: responseJson.message,
        text: "Error en la validación del usuario!",
        timer: 3500,
      });
    }
    return;
  };

  return (
    <>
      <form id="msform">
        
        <fieldset>
          <h2 className="fs-title">Iniciar Sesión</h2>
          <h3 className="fs-subtitle">Completa lo siguiente</h3>
          <input
            type="text"
            name="email"
            id="inputEmail"
            placeholder="Email : name@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="cpass"
            id="inputPassword"
            placeholder="Escribe Tu Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="button"
            name="next"
            className="next action-button"
            value="Ingresar"
            onClick={login}
          />
          <br></br>
          <Link to="/password"><p className="d-flex text-content-start password">Olvidé mi contraseña</p></Link>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
