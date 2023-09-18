import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import Tratamientos from "./pages/tratamientos.jsx";
import Especialidad from "./pages/especialidades.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Registrar from "./pages/registrar.jsx";
import Login from "./pages/login.jsx";
import Citas from "./pages/listacitas.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Tratamientos />} path="/tratamientos" />
            <Route element={<Especialidad />} path="/especialidades" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Registrar />} path="/registrar" />
            <Route element={<Login />} path="/inicio-sesion" />
            <Route element={<Citas />} path="/listacitas" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
