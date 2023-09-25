import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/password.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const [email, setEmail] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const login = () => {
    if (email === "") {
      Swal.fire({
        icon: "warning",
        title: "Cuidado!",
        text: "Debes ingresar el correo",
        timer: 3500,
      });
      return;
    }

    const obj = {
      email: email,
    };

    fetch("/forgot_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud");
        }
      })
      .then((responseData) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: responseData.message,
          timer: 2500,
        });
        navigate("/inicio-sesion"); // Redirige a la ruta deseada
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud",
          timer: 3500,
        });
      });
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
            onClick={login}
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