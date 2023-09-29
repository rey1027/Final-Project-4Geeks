import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/password.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const [email, setEmail] = useState("");
  const { actions,store } = useContext(Context);
  const navigate = useNavigate();

  const resetpassword = async() => {
    if (email === "") {
      Swal.fire({
        icon: "warning",
        title: "Cuidado!",
        text: "Debes ingresar el correo",
        timer: 3500,
      });
      return;
    }
    
    let obj = {
      email: email
    };

    let response = await actions.fetchPromise(
      "/api/forgot_password",
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
        title: responseJson.message,
        timer: 2500,
      });
      navigate("/inicio-sesion"); //Ruta a la que queremos ir
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
    <div className="Login">
      <div className="row d-flex justify-content-center">
        <h1 className="d-flex justify-content-center titulo "></h1>
      </div>

      <div className="mb-3 row">
        <div className="col-4"></div>
        <label htmlFor="inputEmail" className="col-sm-1 col-form-label atributos">
          <b>Correo</b>
        </label>
        <div className="col-sm-4">
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
      <div className="row ">
        <div className="col-lg-4 col-sm-2"></div>
        <div className="col-lg-4 col-sm-6 ">
          <button
            type="button"
            className="btn botonR fs-5 mt-4"
            onClick={resetpassword}
          >
            <b>Enviar Correo</b>
          </button>
        </div>
        <div className="col-lg-4 col-sm-2"></div>
      </div>
    </div>
  );
};

export default Password;