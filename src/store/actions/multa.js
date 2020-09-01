import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";

const cargarMultaConExito = (multa) => {
    return {
        type: actionTypes.CARGAR_MULTA_CON_EXITO,
        multa: multa,
    }
}

const cargarMultaConError = (error) => {
    return {
        type: actionTypes.CARGAR_MULTA_CON_ERROR,
        error: error,
    }
}

export const cargarMulta = (id) => {
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
        Axios.get("/getMulta", params)
            .then(response => {
                console.log(response);
                dispatch(cargarMultaConExito(response.data));
            }).catch(error => {
                console.log(error);
                dispatch(cargarMultaConError(error));
                dispatch(enqueueSnackbar({message: "Error al cargar multa. Intente nuevamente", options: {variant: "error"}}));
            });
    }
}