import * as actionTypes from "../../share/actionTypes";

const initialState = {
    multas: [],
    cargando: true,
    error: false,
    textoDeError: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARGAR_MULTAS_CON_EXITO:
            return {
                ...state,
                multas: action.multas,
                cargando: false,
                error: false,
            };
        case actionTypes.CARGAR_MULTAS_CON_ERROR:
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