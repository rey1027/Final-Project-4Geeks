import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/logo.png";

export const Navbar = () => {
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
            <button type="button" className="btn botones mx-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Servicios
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/tratamientos">
                  <p className="dropdown-item" >Tratamientos</p>
                </Link>
              </li>

              <li>
                <Link to="/especialidades">
                  <p className="dropdown-item" >Especialidades</p>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <p className="dropdown-item" >Especialistas</p>
                </Link>
              </li>
              <li>
                <Link to="/listacitas">
                  <p className="dropdown-item" >Citas</p>
                </Link>
              </li>

            </ul>
          </div>
          <Link to="/registrar">
            <button className="btn mx-2 botones">Registrarse</button>
          </Link>
          <Link to="/inicio-sesion">
            <button className="btn mx-2 botones">Iniciar Sesión</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
