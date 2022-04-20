import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import Multas from "../Multas";
import Perfil from "../Perfil";
import estilos from "./Layout.module.css";
import BarraSuperior from "../../components/BarraSuperior/BarraSuperior";
import Multa from "../Multa";
import Usuarios from "../Usuarios";
import Usuario from "../Usuario";
import InspectorLogueado from "../../components/InspectorLogueado/InspectorLogueado";
import Vehiculos from "../Vehiculos";
import Infracciones from "../Infracciones";
import { useSelector } from "react-redux";

const Layout = () => {
  const rol = useSelector(state => state.login.rol);

  let routes;
  switch (rol) {
    case 'Supervisor':
      routes = (
        <>
          <Route path="/multas/:id" exact={true} component={Multa} />
          <Route path="/multas" exact={true} component={Multas} />
          <Redirect from="/" to="/multas" />
        </>
      );
      break;
    case 'Administrador':
      routes = (
        <Switch>
          <Route path="/usuarios/:id" exact={true} component={Usuario} />
          <Route path="/usuarios" exact={true} component={Usuarios} />
          <Route path="/vehiculos" exact={true} component={Vehiculos} />
          <Route path="/infracciones" exact={true} component={Infracciones} />
          <Redirect from="/" to="/usuarios" />
        </Switch>
      );
      break;
    case 'Inspector':
      routes = (
        <>
          <Route path="/notallowed" component={InspectorLogueado} />
          <Redirect from="/" to="/notallowed" />
        </>
      );
      break;
    default:
      routes = null;
  }

  return (
    <Box className={estilos.Layout}>
      <BarraSuperior />
      <Container className={estilos.Contenido}>
        <Switch>
          <Route path="/perfil" component={Perfil} />
          <Route path="/usuarios" exact={true} component={Usuarios} />
          {routes}
        </Switch>
      </Container>
    </Box>
  );
};

export default Layout;
