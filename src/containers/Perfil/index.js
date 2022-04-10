import React, { Component } from "react";
import {Button, Avatar, List, ListItemIcon, ListItem, ListItemText, CircularProgress, Container, Typography, Grid, Divider} from "@material-ui/core";
import {Email, Home, Phone, Fingerprint, Event, Wc, LocationCity, LocationOn} from "@material-ui/icons";
import CambiarContrasena from "../CambiarContrasena";
import { connect } from "react-redux";
import { abrirDialogCambiarContrasena, cerrarDialogCambiarContrasena } from "../CambiarContrasena/actions";
import { cargarPerfil } from "./actions";
import Notifier from "../Notifier";

class Perfil extends Component {
    componentDidMount = () => {
        this.props.cargarPerfil();
    }

    render() {
        return (
            <Container>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.error ?
                    <>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12}>
                                <Avatar style={{width: "200px", height: "200px"}} src={this.props.foto} alt={this.props.datos.nombre} />
                            </Grid>
                            <Grid item={true} xs={12} style={{verticalAlign: "center"}}>
                                <Typography variant="h2">
                                    {this.props.datos.nombre}
                                </Typography>
                                <Typography variant="h4">{this.props.datos.rol}</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText primary="Correo electrónico" secondary={this.props.datos.email} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Fingerprint />
                                        </ListItemIcon>
                                        <ListItemText primary="DNI" secondary={this.props.datos.dni} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Event />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Fecha de nacimiento"
                                            secondary={this.props.datos.fechaNacimiento.split('-').reverse().join('/')}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Wc />
                                        </ListItemIcon>
                                        <ListItemText primary="Sexo" secondary={this.props.datos.sexo} />
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
                                        <ListItemText primary="Teléfono" secondary={this.props.datos.telefono} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Home />
                                        </ListItemIcon>
                                        <ListItemText primary="Dirección" secondary={this.props.datos.direccion} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationCity />
                                        </ListItemIcon>
                                        <ListItemText primary="Localidad" secondary={this.props.datos.localidad} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <ListItemText primary="Provincia" secondary={this.props.datos.provincia} />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grid>
                            <Grid item={true} xs={12}>
                                <Button variant="contained" color="primary" onClick={this.props.abrirDialogCambiarContrasena}>Cambiar contraseña</Button>
                            </Grid>
                        </Grid>
                        <CambiarContrasena open={this.props.mostrarDialog} onClose={this.props.cerrarDialogCambiarContrasena} />
                    </>
                : null}
                <Notifier />
            </Container>
        );
    };
}

const mapStateToProps = state => {
    return {
        id: "",
        datos: state.perfil.datos,
        foto: state.perfil.foto,
        cargando: state.perfil.cargando,
        error: state.perfil.error,
        textoDeError: state.perfil.textoDeError,
        mostrarDialog: state.cambiarContrasena.mostrarDialog,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarPerfil: () => dispatch(cargarPerfil()),
        abrirDialogCambiarContrasena: () => dispatch(abrirDialogCambiarContrasena()),
        cerrarDialogCambiarContrasena: () => dispatch(cerrarDialogCambiarContrasena()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);