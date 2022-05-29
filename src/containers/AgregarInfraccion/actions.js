import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { traducirError } from "../../share/traducirError";
import { cargarInfracciones } from "../Infracciones/actions";

export const abrirDialogAgregarInfraccion = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_AGREGAR_INFRACCION,
    }
}

export const cerrarDialogAgregarInfraccion = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_AGREGAR_INFRACCION,
    }
}

const agregarInfraccionStart = () => {
    return {
        type: actionTypes.AGREGAR_INFRACCION_START,
    }
}

const agregarInfraccionConExito = () => {
    return {
        type: actionTypes.AGREGAR_INFRACCION_CON_EXITO,
    }
}

const agregarInfraccionConError = (error) => {
    return {
        type: actionTypes.AGREGAR_INFRACCION_CON_ERROR,
        error: error,
    }
}

export const agregarInfraccion = (ley, articulo, inciso, extracto, codigo,
    vigenciaInicio,
    vigenciaFin,
    unidadesFijasMin,
    unidadesFijasMax) => {
    return dispatch => {
        dispatch(agregarInfraccionStart());
        const data = {
          ley, 
          articulo, 
          inciso,
          extracto,
          codigo,
          vigenciaInicio,
          vigenciaFin,
          unidadesFijasMin,
          unidadesFijasMax
        };
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        Axios.post("/addInfraccion", data, headers)
            .then(() => {
                dispatch(agregarInfraccionConExito());
                dispatch(enqueueSnackbar({message: "Infraccion creada correctamente", options: {variant: "success"}}));
                dispatch(cargarInfracciones());
                dispatch(cerrarDialogAgregarInfraccion());
            }).catch(error => {
                dispatch(agregarInfraccionConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}