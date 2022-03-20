import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../../containers/Notifier/actions";

const cargarUsuarioStart = () => {
    return {
        type: actionTypes.CARGAR_USUARIO_START,
    }
}

const cargarUsuarioConExito = (usuario) => {
    return {
        type: actionTypes.CARGAR_USUARIO_CON_EXITO,
        usuario: usuario,
    }
}

const cargarUsuarioConError = (error) => {
    return {
        type: actionTypes.CARGAR_USUARIO_CON_ERROR,
        error: error,
    }
}

export const cargarUsuario = (id) => {
    const params = {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        params: {
            id: id,
        },
    };
    return dispatch => {
        dispatch(cargarUsuarioStart());
        Axios.get("/getUsuario", params)
            .then(response => {
                console.log(response);
                dispatch(cargarUsuarioConExito(response.data));
            }).catch(error => {
                console.log(error);
                dispatch(cargarUsuarioConError(error));
                dispatch(enqueueSnackbar({message: "Error al cargar usuario. Intente nuevamente", options: {variant: "error"}}));
            });
    }
}
