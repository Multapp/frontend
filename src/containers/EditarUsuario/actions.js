import * as actionTypes from "../../share/actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "../Notifier/actions";
import { cargarUsuarios } from "../Usuarios/actions";
import { cargarUsuario } from "../Usuario/actions";
import { traducirError } from "../../share/traducirError";

export const abrirDialogEditar = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_EDITAR,
    }
}

export const cerrarDialogEditar = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_EDITAR,
    }
}

const editarUsuarioStart = () => {
    return {
        type: actionTypes.EDITAR_USUARIO_START,
    }
}

const editarUsuarioConExito = () => {
    return {
        type: actionTypes.EDITAR_USUARIO_CON_EXITO,
    }
}

const editarUsuarioConError = (error) => {
    return {
        type: actionTypes.EDITAR_USUARIO_CON_ERROR,
        error: error,
    }
}

export const editarUsuario = (id, usuario, editar) => {
    return dispatch => {
        dispatch(editarUsuarioStart());
        const data = new FormData();
        if (editar) {
            data.append("id", id);
        }
        Object.keys(usuario).forEach(key => {
            data.append(key.toString(), usuario[key]);
        });
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        // si editar es true, edita el usuario, si es false crea uno nuevo
        let url = editar ? "/editUsuario" : "/addUsuario";
        Axios.post(url, data, headers)
            .then(response => {
                dispatch(editarUsuarioConExito());
                let texto = editar ? "Usuario actualizado correctamente" : "Usuario creado correctamente";
                dispatch(enqueueSnackbar({message: texto, options: {variant: "success"}}));
                if (editar) {
                    dispatch(cargarUsuario(id));
                }
                else {
                    dispatch(cargarUsuarios());
                }
                dispatch(cerrarDialogEditar());
            }).catch(error => {
                dispatch(editarUsuarioConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}