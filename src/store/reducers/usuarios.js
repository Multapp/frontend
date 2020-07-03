import * as actionTypes from "../actions/actionTypes";

const initialState = {
    usuarios: [],
    cargando: true,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARGAR_USUARIOS_CON_EXITO:
            return {
                ...state,
                usuarios: action.usuarios,
                cargando: false,
                error: false,
            };
        case actionTypes.CARGAR_USUARIOS_CON_ERROR:
            return {
                ...state,
                cargando: false,
                error: action.error,
            };
        case actionTypes.CREAR_USUARIO_CON_EXITO:
            return {
                ...state,
            };
        case actionTypes.CREAR_USUARIO_CON_ERROR:
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default reducer;