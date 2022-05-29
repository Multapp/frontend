import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { traducirError } from "../../share/traducirError"

const cargarInfraccionesConExito = infracciones => {
    return {
        type: actionTypes.CARGAR_INFRACCIONES_CON_EXITO,
        infracciones: infracciones,
    }
}

const cargarInfraccionesConError = error => {
    return {
        type: actionTypes.CARGAR_INFRACCIONES_CON_ERROR,
        error: error,
    }
}

export const cargarInfracciones = () => {
    return dispatch => {
        Axios.get("/getInfracciones")
            .then(response => {
                console.log(response)
                dispatch(cargarInfraccionesConExito(response.data));
            }).catch(error => {
                dispatch(cargarInfraccionesConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}

const editarInfraccionStart = () => {
    return {
        type: actionTypes.EDITAR_INFRACCIONES_START
    }
}

const editarInfraccionConExito = () => {
    return {
        type: actionTypes.EDITAR_INFRACCIONES_CON_EXITO
    }
}

const editarInfraccionConError = error => {
    return {
        type: actionTypes.EDITAR_INFRACCIONES_CON_ERROR,
        error: error,
    }
}

export const editarInfraccion = (id, data) => {
    return dispatch => {
        dispatch(editarInfraccionStart());
        const infraccion = { id, data };
          const headers = {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
          };
        Axios.post("/editInfraccion", infraccion, headers)
            .then(response => {
                dispatch(editarInfraccionConExito(response.data));
                dispatch(enqueueSnackbar({message: "Infraccion actualizada correctamente", options: {variant: "success"}}));
                dispatch(cargarInfracciones());
            }).catch(error => {
                dispatch(editarInfraccionConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}
