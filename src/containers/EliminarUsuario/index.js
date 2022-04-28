import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, CircularProgress } from "@material-ui/core";
import { eliminarUsuario } from "./actions";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier";
import useStyles from "../../share/useStyles";

const EliminarUsuario = props => {
    const estilos = useStyles();

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>
            {props.eliminar ? "Eliminar usuario": "Reactivar usuario "}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Está seguro de que desea {props.eliminar ? "eliminar": "reactivar"} a {props.nombre}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button color="primary" disabled={props.cargando} onClick={() => props.eliminarUsuario(props.id, props.eliminar)}>
                    {props.eliminar ? "Eliminar": "Reactivar"} 
                    {props.cargando && <CircularProgress size={24} className={estilos.buttonProgress} />}
                </Button>
            </DialogActions>
            <Notifier />
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        id: state.eliminarUsuario.id,
        nombre: state.eliminarUsuario.nombre,
        cargando: state.eliminarUsuario.cargando,
        exito: state.eliminarUsuario.exito,
        error: state.eliminarUsuario.error,
        textoDeError: state.eliminarUsuario.textoDeError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        eliminarUsuario: (id, eliminar) => {dispatch(eliminarUsuario(id, eliminar))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EliminarUsuario));