import React from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import useStyles from "../../share/useStyles";
import { connect } from "react-redux";
import { eliminarInfraccion } from "./actions";

const EliminarInfraccion = props => {
    const estilos = useStyles();

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Eliminar Infraccion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Está seguro de que desea eliminar la infraccion Ley: ?.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button color="primary" disabled={props.cargando} onClick={() => props.eliminarInfraccion(props.id)}>
                    Eliminar
                    {props.cargando && <CircularProgress size={24} className={estilos.buttonProgress} />}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    mostrarDialog: state.eliminarInfraccion.mostrarDialog,
    cargando: state.eliminarInfraccion.cargando,
    exito: state.eliminarInfraccion.exito,
    error: state.eliminarInfraccion.error,
    textoDeError: state.eliminarInfraccion.textoDeError,
});

const mapDispatchToProps = dispatch => ({
    eliminarInfraccion: id => dispatch(eliminarInfraccion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EliminarInfraccion);