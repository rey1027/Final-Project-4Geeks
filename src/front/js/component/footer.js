import React, { Component } from "react";
import logo from "../../img/logo.png";

export const Footer = () => (
  <footer className="container-fluid footerF">
    <div className="row mt-2 align-items-center">
      <div className="col border-end">
        <div className="m-5">
          <img className="logo text-center" src={logo} />
        </div>
        <i className="fa-solid fa-phone"></i>
        <h5 className="">Teléfono: +506 2266-9988</h5>
        <br />
        <i className="fa-solid fa-envelope"></i>{" "}
        <h5 className=""> Email: info@clinicadentalsmile.com</h5>
        <p></p>
      </div>
      <div className="col border-end text-center">
        <br />
        <h1 className="text-secondary">
          <i className="fa-solid fa-street-view"></i>
        </h1>
        <br />
        NUESTRAS OFICINAS
        <h5>Paseo Colón, San José.</h5>
      </div>
      <div className="text-secondary col border-end text-center">
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
    <br />
  </footer>
);
