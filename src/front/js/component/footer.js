import React, { Component } from "react";
import logo from "../../img/logo.png";
import "../../styles/home.css";

export const Footer = () => (
  <footer className="container-fluid footerF">
    <div className="row mt-2 align-items-center">
      <div className="col-lg-4 col-sm-3 border-end">
        <div>
          <img className="logo text-center" src={logo} />
        </div>
        <i className="fa-solid fa-phone text-white"></i>
        <h5 className="text-start text-white">Teléfono: +506 2266-9988</h5>
        <br />
        <i className="fa-solid fa-envelope text-white"></i>
        <h5 className="text-start text-white">Email: smileclinic@gmail.com</h5>
      </div>
      <div className="col-lg-4 col-sm-3 border-end text-center">
        <br />
        <h1 className="text-white mt-5">
          <i className="fa-solid fa-street-view"></i>
        </h1>
        <br />
        <h4>NUESTRAS OFICINAS</h4>
        <h5 className="fst-italic">Paseo Colón, San José</h5>
      </div>
      <div className="text-white col-lg-3 col-sm-3 border-end text-center mt-5">
        <h4>
          <i className="fa-brands fa-facebook-f"></i>
        </h4>
        <br />
        <h4>
          <i className="fa-brands fa-instagram"></i>
        </h4>
        <br />
        <h4>
          <i className="fa-brands fa-tiktok"></i>
        </h4>
        <br />
        <h4>
          <i className="fa-brands fa-youtube"></i>
        </h4>
      </div>
    </div>
  </footer>
);
