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
            <p className="fst-italic fs-1">
              <strong>SOMOS</strong>
            </p>
            <h3 className="p-5 descrip ">
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
              <h5>Tratamientos</h5>
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
                <a
                  href="#"
                  className="d-grid gap-2 col-4 boton1 btn btn-info mt-5"
                >
                  <h5 className="text-dark">Ver más</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row especialidades">
          <div className="col-lg-6 col-sm-2 text-center mt-5">
            <div></div>
          </div>
          <div className="col-lg-6 textoD text-dark col-sm-10 mt-5">
            <p>
              <h1 className="text-start mt-4">
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
              <a
                href="#"
                className="d-grid gap-2 col-4 boton3 btn btn-info mt-5"
              >
                <h5 className="text-dark">Ver más</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="container-fluid">
        <div className="row doctora">
          <div className="col-lg-6 col-sm-7 texto mt-5">
            <p>
              <h1 className="text-start text-white">
                <strong>Nuestros Especialistas</strong>
              </h1>
            </p>
            <div className="text-start text-white fw-bol">
              <h4>
                ¡Te invitamos a descubrir a nuestros especialistas en
                odontología!. Contamos con un equipo de profesionales altamente
                capacitados y especializados en diversas áreas de la
                odontología. Están comprometidos con brindar la mejor atención
                dental.
              </h4>
              <a
                href="#"
                className="d-grid gap-2 col-4 boton2 btn btn-info mt-5"
              >
                <h5 className="text-dark">Ver más</h5>
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
        <div className="row solicitud">
          <div className="col-lg-6 col-sm-5 text-center mt-5">
            <div>
              <img className="d5" src={d5} />
            </div>
            <br />
          </div>
          <div className="col-lg-6 col-sm-7 p-5 mt-5">
            <p>
              <h1 className="text-start text-white mt-5">
                <strong>Reservación de cita</strong>
              </h1>
            </p>
            <div className="text-start text-white fw-bol mt-4">
              <h4>
                En nombre de la clínica dental Smile, nos complace ofrecerte
                nuestros servicios de atención dental de alta calidad. Si estás
                buscando una cita para cuidar de tu salud bucal, te invitamos
                cordialmente a programar una cita con nosotros.
              </h4>
              <a
                href="#"
                className="d-grid gap-2 col-lg-4 col-sm-2  boton4 btn btn-info mt-5"
              >
                <h5 className="text-dark">Solicitud de cita</h5>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4 tecnologia pt-2">
        <div className="text-center mt-3">
          <h3 className="fw-bol text-white">Nuestra Tecnología</h3>
        </div>
        <div className="card-group mt-4 grupo">
          <div className="card carta">
            <img
              src="https://i.pinimg.com/564x/66/ae/d2/66aed22db1ab48e9ad14bbdd4129b527.jpg"
              className="card-img-top "
            />
            <div className="card-body">
              <h5 className="card-title">Radiografía Digital</h5>
              <p className="card-text">
                La principal ventaja para el paciente es que la radiografía
                digital requiere menor cantidad de exposición a los rayos X lo
                que se traduce inmediatamente como menor radiación tanto para el
                personal de la clínica como para el paciente.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Solicite su cita</small>
            </div>
          </div>
          <div className="card carta">
            <img
              src="https://i.pinimg.com/564x/e2/41/81/e241811d57f440de79aa1f1998c47c2c.jpg"
              className="card-img-top "
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Laboratorio Dental</h5>
              <p className="card-text">
                El proceso de trabajo se lleva paso a paso desde el modelo en
                yeso hasta la restauración final en porcelana en conjunto con
                nuestros odontólogos, lo cual es crítico para asegurarle un
                éxito a largo plazo de las restauraciones dentales.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Solicite su cita</small>
            </div>
          </div>
          <div className=" card carta">
            <img
              src="https://i.pinimg.com/564x/6b/55/21/6b5521fda374ad49e41fb58357112d78.jpg"
              className="card-img-top "
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Tomografía Dental.</h5>
              <p className="card-text">
                Su uso resulta especialmente relevante al permitir detectar
                otras lesiones que pueden pasar desapercibidas si se estudian
                con técnicas radiográficas convencionales, y en el caso de que
                se requiera colocar implantes, al permitir medir ancho, largo y
                grosor del hueso donde irán colocado
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Solicite su cita</small>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};
