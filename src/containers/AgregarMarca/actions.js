import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { traducirError } from "../../share/traducirError";
import { cargarVehiculos } from "../Vehiculos/actions";

export const abrirDialogAgregarMarca = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_AGREGAR_MARCA,
    }
}

export const cerrarDialogAgregarMarca = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_AGREGAR_MARCA,
    }
}

const agregarMarcaStart = () => {
    return {
        type: actionTypes.AGREGAR_MARCA_START,
    }
}

const agregarMarcaConExito = () => {
    return {
        type: actionTypes.AGREGAR_MARCA_CON_EXITO,
    }
}

const agregarMarcaConError = (error) => {
    return {
        type: actionTypes.AGREGAR_MARCA_CON_ERROR,
        error: error,
    }
}

export const agregarMarca = (marca, modelos) => {
    return dispatch => {
        dispatch(agregarMarcaStart());
        const data = {
          marca,
          modelos: modelos.split(",")
        };
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        Axios.post("/addVehiculo", data, headers)
            .then(() => {
                dispatch(agregarMarcaConExito());
                dispatch(enqueueSnackbar({message: "Marca creada correctamente", options: {variant: "success"}}));
                dispatch(cargarVehiculos());
                dispatch(cerrarDialogAgregarMarca());
            }).catch(error => {
                dispatch(agregarMarcaConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}