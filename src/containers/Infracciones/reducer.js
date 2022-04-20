import * as actionTypes from "../../share/actionTypes";

const initialState = {
    infracciones: [],
    cargando: true,
    cargandoEditar: false,
    error: false,
    textoDeError: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARGAR_INFRACCIONES_CON_EXITO:
            return {
                ...state,
                infracciones: action.infracciones,
                cargando: false,
                error: false,
                textoDeError: "",
            };
        case actionTypes.CARGAR_INFRACCIONES_CON_ERROR:
            return {
                ...state,
                cargando: false,
                error: true,
                textoDeError: action.error,
            };
        case actionTypes.EDITAR_INFRACCIONES_START:
            return {
                ...state,
                cargandoEditar: true
            };
        case actionTypes.EDITAR_INFRACCIONES_CON_EXITO:
            return {
                ...state,
                cargandoEditar: false,
                error: false,
                textoDeError: "",
            };
        case actionTypes.EDITAR_INFRACCIONES_CON_ERROR:
            return {
                ...state,
                cargando: false,
                error: true,
                textoDeError: action.error,
            };
        default:
            return state;
    }
}

export default reducer;