import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { traducirError } from "../../share/traducirError";
import { cargarInfracciones } from "../Infracciones/actions";

export const abrirDialogEliminarInfraccion = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_ELIMINAR_INFRACCION,
    }
}

export const cerrarDialogEliminarInfraccion = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_ELIMINAR_INFRACCION,
    }
}

const eliminarInfraccionStart = () => {
    return {
        type: actionTypes.ELIMINAR_INFRACCION_START,
    }
}

const eliminarInfraccionConExito = () => {
    return {
        type: actionTypes.ELIMINAR_INFRACCION_CON_EXITO,
    }
}

const eliminarInfraccionConError = (error) => {
    return {
        type: actionTypes.ELIMINAR_INFRACCION_CON_ERROR,
        error: error,
    }
}

export const eliminarInfraccion = id => {
    return dispatch => {
        dispatch(eliminarInfraccionStart());
        const data = {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                id: id
            }
        };
        Axios.delete("/deleteInfraccion", data)
            .then(() => {
                dispatch(eliminarInfraccionConExito());
                dispatch(enqueueSnackbar({message: "Infraccion eliminada exitosamente", options: {variant: "success"}}));
                dispatch(cargarInfracciones());
                dispatch(cerrarDialogEliminarInfraccion());
            }).catch(error => {
                dispatch(eliminarInfraccionConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}