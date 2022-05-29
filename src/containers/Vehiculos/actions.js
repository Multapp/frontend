import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { traducirError } from "../../share/traducirError"

const cargarVehiculosConExito = vehiculos => {
    return {
        type: actionTypes.CARGAR_VEHICULOS_CON_EXITO,
        vehiculos: vehiculos,
    }
}

const cargarVehiculosConError = error => {
    return {
        type: actionTypes.CARGAR_VEHICULOS_CON_ERROR,
        error: error,
    }
}

export const cargarVehiculos = () => {
    return dispatch => {
        Axios.get("/getVehiculos")
            .then(response => {
                dispatch(cargarVehiculosConExito(response.data));
            }).catch(error => {
                dispatch(cargarVehiculosConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}

const editarVehiculoStart = () => {
    return {
        type: actionTypes.EDITAR_VEHICULOS_START
    }
}

const editarVehiculoConExito = () => {
    return {
        type: actionTypes.EDITAR_VEHICULOS_CON_EXITO
    }
}

const editarVehiculoConError = error => {
    return {
        type: actionTypes.EDITAR_VEHICULOS_CON_ERROR,
        error: error,
    }
}

export const editarVehiculo = (id, data) => {
    return dispatch => {
        dispatch(editarVehiculoStart());
        const vehiculo = { id, data };
          const headers = {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
          };
        Axios.post("/editVehiculo", vehiculo, headers)
            .then(response => {
                dispatch(editarVehiculoConExito(response.data));
                dispatch(enqueueSnackbar({message: "Vehículo actualizado correctamente", options: {variant: "success"}}));
                dispatch(cargarVehiculos());
            }).catch(error => {
                dispatch(editarVehiculoConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}
