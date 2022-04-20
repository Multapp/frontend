import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import { cerrarSesion } from "../../share/cerrarSesion";
import useStyles from "../../share/useStyles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const BarraSuperior = () => {
  const history = useHistory();
  const photoURL = useSelector(state => state.login.photoURL);
  const displayName = useSelector(state => state.login.displayName);
  const rol = useSelector(state => state.login.rol);
  const [anchorEl, setAnchorEl] = useState(null);

  const estilos = useStyles();

  // metodo para abrir el menu
  const abrirMenuHandler = event => {
    setAnchorEl(event.currentTarget);
  };

  // metodo para cerrar el menu
  const cerrarMenuHandler = () => {
    setAnchorEl(null);
  };

  // metodo que te manda a la pagina para administrar las multas
  const multasHandler = () => {
    cerrarMenuHandler();
    history.push("/multas");
  };

  // metodo que te manda a tu perfil
  const perfilHandler = () => {
    cerrarMenuHandler();
    history.push("/perfil");
  };

  // metodo que te manda a la pagina para administrar usuarios
  const usuariosHandler = () => {
    cerrarMenuHandler();
    history.push("/usuarios");
  };

  // metodo que te manda a la pagina para administrar vehiculos
  const vehiculosHandler = () => {
    cerrarMenuHandler();
    history.push("/vehiculos");
  };

  // metodo que te manda a la pagina para administrar infracciones
  const infraccionesHandler = () => {
    cerrarMenuHandler();
    history.push("/infracciones");
  };

  // metodo para cerrar sesion
  const cerrarSesionHandler = () => {
    cerrarMenuHandler();
    cerrarSesion();
  };

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Logo width={48} height={48} />
        <Typography variant="h6" style={{flexGrow: "1"}}>
          MultApp
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="menu" aria-haspopup="true" onClick={abrirMenuHandler}>
          <Avatar className={estilos.avatar} src={photoURL} alt={displayName} />
        </IconButton>
        <Menu id="menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={cerrarMenuHandler}>
          {rol === "Supervisor" && <MenuItem onClick={multasHandler}>Administrar multas</MenuItem>}
          {rol === "Administrador" && <MenuItem onClick={usuariosHandler}>Administrar usuarios</MenuItem>}
          {rol === "Administrador" && <MenuItem onClick={vehiculosHandler}>Administrar vehículos</MenuItem>}
          {rol === "Administrador" && <MenuItem onClick={infraccionesHandler}>Administrar infracciones</MenuItem>}
          {rol !== "Inspector" && <MenuItem onClick={perfilHandler}>Mi perfil</MenuItem>}
          <MenuItem onClick={cerrarSesionHandler}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default BarraSuperior;
