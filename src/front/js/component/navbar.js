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
          <div class="btn-group">
            <button type="button" class="btn botones mx-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Servicios
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link to="/tratamientos">
                  <a class="dropdown-item" >Tratamientos</a>
                </Link>
              </li>
              <li>
                <Link to="/especialidades">
                  <a class="dropdown-item" >Especialidades</a>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <a class="dropdown-item" >Especialistas</a>
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
