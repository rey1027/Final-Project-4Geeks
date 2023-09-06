import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import protesis from "../../img/protesis.png";
import doc1 from "../../img/doc1.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className=" inicio">
        <div className="row d-flex">
          <div className="col-7 mt-5 text-center">
            <p>
              <h1>
                <strong>SOMOS</strong>
              </h1>
            </p>
            <h5>
              La clínica dental Smile es un centro especializado en brindar
              servicios odontológicos de excelencia y atención personalizada.
              Nuestro equipo de profesionales altamente capacitados se dedica a
              mejorar y mantener la salud bucal de nuestros pacientes, con un
              enfoque en lograr sonrisas radiantes y saludables.
            </h5>
          </div>
          <div className="col-5">
            <img
              src="https://i.pinimg.com/564x/a0/42/03/a04203147caef4107b9a3e48af3e7f57.jpg"
              className=" mx-auto d-block chica shadow-lg "
            ></img>
          </div>
        </div>
        <div className="contenedor d-flex shadow-lg align-items-center">
          <div className="row">
            <div className="col-1 p-4 text-white">
              <h1>+10</h1>
              <h5>Especialidades</h5>
            </div>
            <div className="col-6 text-start">
              <div>
                <img src={protesis} />
              </div>
            </div>
            <div className="col-5">
              <div className="texto mt-5 text-md-start p-5 text-white fw-bol">
                <h4>
                  {" "}
                  Aquí encontrarás una amplia gama de servicios diseñados para
                  cuidar y mejorar tu salud bucal.
                </h4>
                <a href="#" class=" boton1 btn btn-light mt-4">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row doctora">
          <div className="col-6">hola</div>
          <div className="col-6">
            <div>
              <img src={doc1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
