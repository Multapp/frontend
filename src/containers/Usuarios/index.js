import React, { Component, Fragment } from "react";
import { Box, Container, Typography, Tabs, Tab, CircularProgress, List, ListItem, Divider, ListItemAvatar, Avatar, ListItemText, Fab, ListItemSecondaryAction, IconButton, createMuiTheme, Tooltip } from "@material-ui/core";
import { Add, ToggleOff, ToggleOn } from "@material-ui/icons";
import EditarUsuario from "../EditarUsuario";
import EliminarUsuario from "../EliminarUsuario";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { cargarUsuarios } from "./actions";
import { withSnackbar } from "notistack";
import { setUsuarioAEliminar, abrirDialogEliminar, cerrarDialogEliminar } from "../EliminarUsuario/actions";
import Notifier from "../Notifier";
import { abrirDialogEditar, cerrarDialogEditar } from "../EditarUsuario/actions";

class Usuarios extends Component {
    state = {
        eliminar: false,
        pestanaActual: 0,
    }

    componentDidMount = () => {
        this.props.cargarUsuarios();
    }

    // esta funcion fue copiada de la pagina de https://material-ui.com/components/tabs/#simple-tabs
    // porque importar TabPanel de @material-ui/lab NO ANDA
    TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }

    // metodo para cambiar de pestañas
    tabChangeHandler = (event, newValue) => {
        this.setState({...this.state, pestanaActual: newValue});
    }

    deleteUserHandler = (id, nombre, eliminar) => {
        this.setState({...this.state, eliminar: eliminar});
        this.props.setUsuarioAEliminar(id, nombre);
        this.props.abrirDialogEliminar();
    }

    userSelectedHandler = (id) => {
        this.props.history.push("/usuarios/" + id);
    }

    createUserRow = user => (
        <>
            <ListItem key={user.id} button={true} onClick={() => this.userSelectedHandler(user.id)}>
                <ListItemAvatar>
                    <Avatar alt={"Foto de " + user.nombre} src={user.foto} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.nombre}
                    secondary={user.email}
                />
                { (!!user.desactivado) &&
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.deleteUserHandler(user.id, user.nombre, false)}>
                            <ToggleOff/>
                        </IconButton>
                    </ListItemSecondaryAction>
                }                
                { (!user.desactivado) &&
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.deleteUserHandler(user.id, user.nombre, true)}>
                            <ToggleOn color="primary"/>
                        </IconButton>
                    </ListItemSecondaryAction>
                }
            </ListItem>
            <Divider />
        </>
    );

    render() {
        let inspectores = this.props.usuarios
            .filter(usuario => usuario.rol === "Inspector")
            .map(this.createUserRow);

        let supervisores = this.props.usuarios
            .filter(usuario => usuario.rol === "Supervisor")
            .map(this.createUserRow);

        let administradores = this.props.usuarios
            .filter(usuario => usuario.rol === "Administrador" && usuario.id !== localStorage.getItem("uid"))
            .map(this.createUserRow);

        let ciudadanos = this.props.usuarios
            .filter(usuario => usuario.rol === "Ciudadano")
            .map(this.createUserRow);

        const theme = createMuiTheme();

        return (
            <Fragment>
                <Container maxWidth="lg" style={{minHeight: "100vh"}}>
                    <Tabs value={this.state.pestanaActual} centered={true} onChange={this.tabChangeHandler} indicatorColor="primary" textColor="primary">
                        <Tab label="Inspectores" />
                        <Tab label="Supervisores" />
                        <Tab label="Administradores" />
                        <Tab label="Ciudadanos" />
                    </Tabs>
                    <this.TabPanel value={this.state.pestanaActual} index={0}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {inspectores.length !== 0 ? inspectores : "Aún no hay inspectores cargados"}
                            </List>
                        }
                    </this.TabPanel>
                    <this.TabPanel value={this.state.pestanaActual} index={1}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {supervisores.length !== 0 ? supervisores : "Aún no hay supervisores cargados"}
                            </List>
                        }
                    </this.TabPanel>
                    <this.TabPanel value={this.state.pestanaActual} index={2}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {administradores.length !== 0 ? administradores : "Aún no hay administradores cargados"}
                            </List>
                        }
                    </this.TabPanel>
                    <this.TabPanel value={this.state.pestanaActual} index={3}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {ciudadanos.length !== 0 ? ciudadanos : "Aún no hay ciudadanos registrados"}
                            </List>
                        }
                    </this.TabPanel>
                    <Tooltip title="Agregar usuario" placement="left" arrow>
                        <Fab color="primary" onClick={this.props.abrirDialogEditar} style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}>
                            <Add />
                        </Fab>
                    </Tooltip>
                </Container>
                <EditarUsuario
                    open={this.props.mostrarDialogEditar}
                    onClose={this.props.cerrarDialogEditar}
                    editar={false}
                />
                <EliminarUsuario
                    open={this.props.mostrarDialogEliminar}
                    onClose={this.props.cerrarDialogEliminar}
                    eliminar={this.state.eliminar}
                />
                <Notifier />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        usuarios: state.usuarios.usuarios,
        cargando: state.usuarios.cargando,
        error: state.usuarios.error,
        textoDeError: state.usuarios.textoDeError,
        mostrarDialogEditar: state.editarUsuario.mostrarDialog,
        mostrarDialogEliminar: state.eliminarUsuario.mostrarDialog,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        cargarUsuarios: () => {dispatch(cargarUsuarios())},
        setUsuarioAEliminar: (id, nombre, eliminar) => {dispatch(setUsuarioAEliminar(id, nombre, eliminar))},
        abrirDialogEditar: () => {dispatch(abrirDialogEditar())},
        cerrarDialogEditar: () => {dispatch(cerrarDialogEditar())},
        abrirDialogEliminar: () => {dispatch(abrirDialogEliminar())},
        cerrarDialogEliminar: () => {dispatch(cerrarDialogEliminar())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Usuarios)));