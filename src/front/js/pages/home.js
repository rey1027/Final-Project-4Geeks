import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import protesis from "../../img/protesis.png";
import doc1 from "../../img/doc1.png";
import g3 from "../../img/g3.png";
import d5 from "../../img/d5.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className=" inicio">
        <div className="row d-flex">
          <div className="col-lg-7 col-sm-12 SOMOS mt-5 text-center">
            <p className="display-3">
              <strong>SOMOS</strong>
            </p>
            <h3>
              La clínica dental Smile es un centro especializado en brindar
              servicios odontológicos de excelencia y atención personalizada.
              Nuestro equipo de profesionales altamente capacitados se dedica a
              mejorar y mantener la salud bucal de nuestros pacientes, con un
              enfoque en lograr sonrisas radiantes y saludables.
            </h3>
          </div>
          <div className="col-lg-5 col-sm-12 ">
            <img
              src="https://i.pinimg.com/564x/a0/42/03/a04203147caef4107b9a3e48af3e7f57.jpg"
              className=" mx-auto d-block chica shadow-lg "
            ></img>
          </div>
        </div>
        <div className="contenedor d-flex shadow-lg align-items-center">
          <div className="row">
            <div className="col-lg-1 col-sm-12 p-4 text-white">
              <h1>+10</h1>
              <h5>Especialidades</h5>
            </div>
            <div className="col-lg-6 col-sm-12 text-start">
              <div>
                <img className="protesis" src={protesis} />
              </div>
            </div>
            <div className="col-lg-5 col-sm-12">
              <div className=" mt-5 text-md-start p-5 text-white fw-bol">
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
          <div className="col-lg-6 col-sm-7 texto mt-5">
            <p>
              <h1 className="text-start text-white mt-5">
                <strong>Nuestros Especialistas</strong>
              </h1>
            </p>
            <div className="text-start text-white fw-bol">
              <h4>
                ¡Te invitamos a descubrir a nuestros especialistas en
                odontología! En nuestra clínica dental, contamos con un equipo
                de profesionales altamente capacitados y especializados en
                diversas áreas de la odontología. Están comprometidos con
                brindar la mejor atención dental.
              </h4>
              <a href="#" class=" boton1 btn btn-light mt-4">
                Learn more
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-sm-5 text-center mt-5">
            <div>
              <img className="doc1 rounded" src={doc1} />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container-fluid">
        <div className="row especialidades">
          <div className="col-lg-6 col-sm-5 text-center mt-5">
            <div></div>
          </div>
          <div className="col-lg-6 textoD text-dark col-sm-7 mt-5">
            <p>
              <h1 className="text-start mt-5">
                <strong>Especialidades</strong>
              </h1>
            </p>
            <div className="text-start fw-bol">
              <h4>
                Estamos encantados de invitarte a explorar nuestras
                especialidades en el campo de la odontología. En nuestra
                clínica, nos enorgullece ofrecer una amplia gama de servicios
                especializados para satisfacer todas tus necesidades dentales.
              </h4>
              <a href="#" class=" boton1 btn btn-light mt-4">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container-fluid">
        <div className="row solicitud">
          <div className="col-lg-6 col-sm-5 text-center mt-5">
            <div>
              <img className="rounded" src={d5} />
            </div>
          </div>
          <div className="col-lg-6 col-sm-7 mt-5">
            <p>
              <h1 className="text-start text-white mt-5">
                <strong>Reservacion de cita</strong>
              </h1>
            </p>
            <div className="text-start text-white fw-bol">
              <h4>
                Estamos encantados de invitarte a explorar nuestras
                especialidades en el campo de la odontología. En nuestra
                clínica, nos enorgullece ofrecer una amplia gama de servicios
                especializados para satisfacer todas tus necesidades dentales.
              </h4>
              <a href="#" class=" boton1 btn btn-light mt-4">
                Solicitud de cita
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
