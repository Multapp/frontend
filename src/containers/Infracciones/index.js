import React, { Component, Fragment } from "react";
import { Container, List, Fab, createMuiTheme, Tooltip, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier";
import { cargarInfracciones, editarInfraccion } from "./actions";
import Infraccion from "../../components/Infraccion/Infraccion";
import AgregarInfraccion from "../AgregarInfraccion";
import { abrirDialogAgregarInfraccion, cerrarDialogAgregarInfraccion } from "../AgregarInfraccion/actions";
import EliminarInfraccion from "../EliminarInfraccion";
import { abrirDialogEliminarInfraccion, cerrarDialogEliminarInfraccion } from "../EliminarInfraccion/actions";
import { Typography } from "@mui/material";

class Infracciones extends Component {
    state = {
        idSeleccionado: "",
        marcaSeleccionada: "",
        modeloSeleccionado: "",
    }

    componentDidMount = () => {
        this.props.cargarInfracciones();
    }

    onDeleteInfraccion = (id, infraccion) => {
      this.setState({
        idSeleccionado: id,
        infraccionSeleccionada: infraccion
      });
      this.props.abrirDialogEliminarInfraccion();
    }

    render() {
        const theme = createMuiTheme();

        return (
            <Fragment>
                <Container maxWidth="lg" style={{minHeight: "100vh"}}>
                    {this.props.cargando ? <CircularProgress /> :
                        <Fragment>
                            <List>
                                {this.props.infracciones.length === 0 && (
                                    <Typography>Aún no hay infracciones cargadas.</Typography>
                                )}
                                {this.props.infracciones.map(infraccion => ( // todo probar comparar art + inciso
                                    <Infraccion
                                        key={infraccion.id}
                                        ley={infraccion.ley}
                                        inciso={infraccion.inciso}
                                        extracto={infraccion.extracto}
                                        infraccion={infraccion}
                                        onUpdateInfraccion={this.props.editarInfraccion}
                                        onDeleteInfraccion={() => this.onDeleteInfraccion(infraccion.id, infraccion)}
                                    />
                                ))}
                            </List>
                            <Tooltip title="Agregar Infraccion" placement="left" arrow>
                                <Fab
                                    color="primary"
                                    onClick={this.props.abrirDialogAgregarInfraccion}
                                    style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}
                                >
                                    <Add />
                                </Fab>
                            </Tooltip>

                            <AgregarInfraccion
                                open={this.props.mostrarDialogAgregarInfraccion}
                                onClose={this.props.cerrarDialogAgregarInfraccion}
                            />
                            <EliminarInfraccion
                                open={this.props.mostrarDialogEliminarInfraccion}
                                onClose={this.props.cerrarDialogEliminarInfraccion}
                                id={this.state.idSeleccionado}
                                infraccion={this.state.infraccionSeleccionada}
                            />
                        </Fragment>
                    }
                </Container>
                <Notifier />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        infracciones: state.infracciones.infracciones,
        cargando: state.infracciones.cargando,
        error: state.infracciones.error,
        textoDeError: state.infracciones.textoDeError,
        mostrarDialogAgregarInfraccion: state.agregarInfraccion.mostrarDialog,
        mostrarDialogEliminarInfraccion: state.eliminarInfraccion.mostrarDialog,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        cargarInfracciones: () => dispatch(cargarInfracciones()),
        abrirDialogAgregarInfraccion: () => dispatch(abrirDialogAgregarInfraccion()),
        cerrarDialogAgregarInfraccion: () => dispatch(cerrarDialogAgregarInfraccion()),
        abrirDialogEliminarInfraccion: () => dispatch(abrirDialogEliminarInfraccion()),
        cerrarDialogEliminarInfraccion: () => dispatch(cerrarDialogEliminarInfraccion()),
        editarInfraccion: (id, data) => dispatch(editarInfraccion(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Infracciones)));