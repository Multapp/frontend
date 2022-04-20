import * as actionTypes from "../../share/actionTypes";

const initialState = {
    mostrarDialog: false,
    cargando: false,
    exito: false,
    error: false,
    textoDeError: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ABRIR_DIALOG_ELIMINAR_INFRACCION:
            return {
                ...state,
                mostrarDialog: true,
            };
        case actionTypes.CERRAR_DIALOG_ELIMINAR_INFRACCION:
            return {
                ...state,
                mostrarDialog: false,
                cargando: false,
                exito: false,
                error: false,
                textoDeError: "",
            };
        case actionTypes.ELIMINAR_INFRACCION_START:
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.ELIMINAR_INFRACCION_CON_EXITO:
            return {
                ...state,
                cargando: false,
                exito: true,
                error: false,
                textoDeError: "",
            };
        case actionTypes.ELIMINAR_INFRACCION_CON_ERROR:
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