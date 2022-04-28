import React, { Component, Fragment } from "react";
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Container, CircularProgress, Tooltip, Fab, createMuiTheme } from "@material-ui/core";
import { Edit, Email, Fingerprint, Event, Wc, Phone, LocationCity, Home, LocationOn } from '@material-ui/icons';
import { connect } from "react-redux";
import { cargarUsuario } from "./actions";
import EditarUsuario from "../EditarUsuario";
import Notifier from "../Notifier";
import { abrirDialogEditar, cerrarDialogEditar } from "../EditarUsuario/actions";

class Usuario extends Component {
    state = {
        editarUsuario: false,
    }

    componentDidMount = () => {
        const id = this.props.location.pathname.concat("").split("/")[2];
        this.props.cargarUsuario(id);
    }
    
    render() {
        const theme = createMuiTheme();

        return (
            <Container>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.errorAlCargar ?
                    <Fragment>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12}>
                                <Avatar style={{width: "200px", height: "200px"}} src={this.props.usuario.foto} alt={this.props.usuario.displayName} />
                            </Grid>
                            <Grid item={true} xs={12} style={{verticalAlign: "center"}}>
                                <Typography variant="h2">
                                    {this.props.usuario.displayName}
                                </Typography>
                                <Typography variant="h4">{this.props.usuario.rol}</Typography>
                                {!!this.props.usuario.desactivado && 
                                    <Typography variant="h6" color="error">Desactivado</Typography>
                                }
                            </Grid>
                            <Grid item={true} xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText primary="Correo electrónico" secondary={this.props.usuario.email} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Fingerprint />
                                        </ListItemIcon>
                                        <ListItemText primary="DNI" secondary={this.props.usuario.dni} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Event />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Fecha de nacimiento"
                                            secondary={this.props.usuario.fechaNacimiento.split('-').reverse().join('/')}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Wc />
                                        </ListItemIcon>
                                        <ListItemText primary="Sexo" secondary={this.props.usuario.sexo} />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Phone />
                                        </ListItemIcon>
                                        <ListItemText primary="Teléfono" secondary={this.props.usuario.telefono} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Home />
                                        </ListItemIcon>
                                        <ListItemText primary="Dirección" secondary={this.props.usuario.direccion} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationCity />
                                        </ListItemIcon>
                                        <ListItemText primary="Localidad" secondary={this.props.usuario.localidad} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <ListItemText primary="Provincia" secondary={this.props.usuario.provincia} />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grid>
                        </Grid>
                        {this.props.usuario.rol !== "Ciudadano" &&
                            <Fragment>
                                <Tooltip title="Editar datos" placement="left" arrow>
                                    <Fab color="primary" onClick={this.props.abrirDialogEditar} style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}>
                                        <Edit />
                                    </Fab>
                                </Tooltip>
                                <EditarUsuario open={this.props.mostrarDialog} onClose={this.props.cerrarDialogEditar} editar={true} />
                            </Fragment>
                        }
                        <Notifier />
                    </Fragment>
                : null}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario.usuario,
        cargando: state.usuario.cargando,
        errorAlCargar: state.usuario.errorAlCargar,
        textoDeErrorAlCargar: state.usuario.textoDeErrorAlCargar,
        estadoCambiado: state.usuario.estadoCambiado,
        errorAlModificarDatos: state.usuario.errorAlModificarDatos,
        textoDeErrorAlModificarDatos: state.usuario.textoDeErrorAlModificarDatos,
        mostrarDialog: state.editarUsuario.mostrarDialog,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarUsuario: (id) => {dispatch(cargarUsuario(id))},
        abrirDialogEditar: () => {dispatch(abrirDialogEditar())},
        cerrarDialogEditar: () => {dispatch(cerrarDialogEditar())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);