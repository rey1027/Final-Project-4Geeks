import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="fondo inicio">
        <div className="row d-flex">
          <div className="col-7 mt-5 text-center">
            <p>
              <h1>
                <strong>SOMOS</strong>
              </h1>
            </p>
            <p>
              La clínica dental Smile es un centro especializado en brindar
              servicios odontológicos de excelencia y atención personalizada.
              Nuestro equipo de profesionales altamente capacitados se dedica a
              mejorar y mantener la salud bucal de nuestros pacientes, con un
              enfoque en lograr sonrisas radiantes y saludables.
            </p>
          </div>
          <div className="col-5">
            <img
              src="https://i.pinimg.com/564x/a0/42/03/a04203147caef4107b9a3e48af3e7f57.jpg"
              className=" mx-auto d-block chica shadow-lg "
            ></img>
          </div>
        </div>
        <div className="contenedor shadow-lg">
          <div className="row">
            <div className="col-6 text-start">
              <p>1</p>
            </div>
            <div className="col-6 text-center">
              <p>2</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-start">
              <p>3</p>
            </div>
            <div className="col-6 text-center">
              <p>4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
