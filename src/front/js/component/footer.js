import React, { Component } from "react";

export const Footer = () => (
  <footer className="container-fluid bg-light ">
    <div className="row mt-2 align-items-center">
      <div className="col border-end">
        <h2>SMILE</h2>
        <i class="fa-solid fa-phone"></i> +506 2266-9988
        <br />
        <i class="fa-solid fa-envelope"></i> info@clinicadentalsmile.com
        <p></p>
      </div>
      <div className="col border-end">
        SOBRE CLINICA DENTAL SMILE
        <br />
        <i class="fa-solid fa-street-view"></i>
        <br />
        NUESTRAS OFICINAS
      </div>
      <div className="col border-end">
        <i class="fa-brands fa-facebook-f"></i>
        <br />
        <i class="fa-brands fa-instagram"></i>
        <br />
        <i class="fa-brands fa-tiktok"></i>
        <br />
        <i class="fa-brands fa-youtube"></i>
      </div>
    </div>
    <br />
  </footer>
);
