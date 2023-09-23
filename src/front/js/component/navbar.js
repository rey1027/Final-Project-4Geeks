import React, {useContext}from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/logoN.png";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate(""); //

  const logout = async () => {
    let response = await actions.fetchPromise(
      "/api/logout",
      "POST"
    );

    if (response.ok) {
      let responseJson = await response.json();
      console.log(responseJson);
      location.reload()
    }
  }


  return (
    <nav className="navbar jumbotron">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img src={logo} className="imagen"></img>
          </span>
        </Link>
        <div className="ml-auto">
          <div className="btn-group">
            <button
              type="button"
              className="btn botones mx-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Servicios
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/tratamientos">
                  <p className="dropdown-item">Tratamientos</p>
                </Link>
              </li>
              <li>
                <Link to="/especialistas">
                  <p className="dropdown-item">Especialistas</p>
                </Link>
              </li>
              <li>
                <Link to="/listacitas">
                  <p className="dropdown-item" >Citas</p>
                </Link>
              </li>
            </ul>
          </div>
          {store.current_user ? store.current_user.rol == "user" ? 
          <>
            <Link to="/citas">
              <button className="btn mx-2 botones">Citas</button>
            </Link> 
            <button type="button" className="btn mx-2 botones" onClick={logout}>Cerrar Sesión</button>
          </>
          :
          <>
          <Link to="/listacitas">
            <button className="btn mx-2 botones">Lista Citas</button>
          </Link> 

            <button type="button" className="btn mx-2 botones" onClick={logout}>Cerrar Sesión</button>
          </>
          :
          <>
            <Link to="/registrar">
              <button className="btn mx-2 botones">Registrarse</button>
            </Link>
            <Link to="/inicio-sesion">
              <button className="btn mx-2 botones">Iniciar Sesión</button>
            </Link> 
          </>

        }
          
        </div>
      </div>
    </nav>
  );
};
