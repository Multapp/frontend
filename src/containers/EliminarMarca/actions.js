import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { traducirError } from "../../share/traducirError";
import { cargarVehiculos } from "../Vehiculos/actions";

export const abrirDialogEliminarMarca = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_ELIMINAR_MARCA,
    }
}

export const cerrarDialogEliminarMarca = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_ELIMINAR_MARCA,
    }
}

const eliminarMarcaStart = () => {
    return {
        type: actionTypes.ELIMINAR_MARCA_START,
    }
}

const eliminarMarcaConExito = () => {
    return {
        type: actionTypes.ELIMINAR_MARCA_CON_EXITO,
    }
}

const eliminarMarcaConError = (error) => {
    return {
        type: actionTypes.ELIMINAR_MARCA_CON_ERROR,
        error: error,
    }
}

export const eliminarMarca = id => {
    return dispatch => {
        dispatch(eliminarMarcaStart());
        const data = {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                id: id
            }
        };
        Axios.delete("/deleteVehiculo", data)
            .then(() => {
                dispatch(eliminarMarcaConExito());
                dispatch(enqueueSnackbar({message: "Marca eliminada correctamente", options: {variant: "success"}}));
                dispatch(cargarVehiculos());
                dispatch(cerrarDialogEliminarMarca());
            }).catch(error => {
                dispatch(eliminarMarcaConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}