import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import WithAuth from "../component/Auth/WithAuth";

export const Citas = () => {
  const { store, actions } = useContext(Context);
  

  return (
    <div className="text-center mt-5">
      <h1>Pagina para hacer la solicitud de citas vista protegida</h1>

    </div>
  );
};

export default Citas;
