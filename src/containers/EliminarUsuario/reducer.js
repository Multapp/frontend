import * as actionTypes from "../../share/actionTypes";

const initialState = {
    mostrarDialog: false,
    eliminar: false,
    id: "",
    nombre: "",
    cargando: false,
    exito: false,
    error: false,
    textoDeError: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ABRIR_DIALOG_ELIMINAR:
            return {
                ...state,
                mostrarDialog: true,
            };
        case actionTypes.CERRAR_DIALOG_ELIMINAR:
            return {
                ...state,
                mostrarDialog: false,
                id: "",
                nombre: "",
                cargando: false,
                exito: false,
                error: false,
                textoDeError: "",
            };
        case actionTypes.SET_USUARIO_A_ELIMINAR:
            return {
                ...state,
                id: action.id,
                nombre: action.nombre,
                eliminar: action.eliminar,
            };
        case actionTypes.ELIMINAR_USUARIO_START:
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.ELIMINAR_USUARIO_CON_EXITO:
            return {
                ...state,
                cargando: false,
                exito: true,
                error: false,
                textoDeError: "",
            };
        case actionTypes.ELIMINAR_USUARIO_CON_ERROR:
            return {
                ...state,
                cargando: false,
                exito: false,
                error: false,
                textoDeError: action.error.toString(),
            };
        default:
            return state;
    }
}

export default reducer;