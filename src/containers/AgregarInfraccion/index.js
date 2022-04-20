import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import useStyles from "../../share/useStyles";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { connect } from "react-redux";
import { agregarInfraccion } from "./actions";

const AgregarInfraccion = props => {
    const [ley, setLey] = useState("");
    const [articulo, setArticulo] = useState("");
    const [inciso, setInciso] = useState("");
    const [extracto, setExtracto] = useState("");
    const [codigo, setCodigo] = useState("");
    const [vigenciaInicio, setVigenciaInicio] = useState("");
    const [vigenciaFin, setVigenciaFin] = useState("");
    const [unidadesFijasMin, setUnidadesFijasMin] = useState("");
    const [unidadesFijasMax, setUnidadesFijasMax] = useState("");
    const estilos = useStyles();

    useEffect(() => {
        setLey('');
        setArticulo('');
        setInciso('');
        setExtracto('');
        setCodigo('');
        setVigenciaInicio('');
        setVigenciaFin('');
        setUnidadesFijasMin('');
        setUnidadesFijasMax('');
    }, [props.open]);

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Agregar Infraccion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Debe proveer el nombre de la Infraccion.
                </DialogContentText>
                <TextField
                    label="Ley"
                    fullWidth
                    required
                    value={ley}
                    onChange={event => setLey(event.target.value)}
                />
                <TextField
                    label="Codigo"
                    fullWidth
                    required
                    value={codigo}
                    onChange={event => setCodigo(event.target.value)}
                />
                <TextField
                    label="Articulo"
                    fullWidth
                    required
                    value={articulo}
                    onChange={event => setArticulo(event.target.value)}
                />
                <TextField
                    label="Inciso"
                    fullWidth
                    required
                    value={inciso}
                    onChange={event => setInciso(event.target.value)}
                />
                <TextField
                    label="Extracto"
                    fullWidth
                    multiline
                    value={extracto}
                    onChange={event => setExtracto(event.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Entrada en Vigencia"
                        value={vigenciaInicio}
                        onChange={value => setVigenciaInicio(value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="Fin de Vigencia"
                        value={vigenciaFin}
                        onChange={value => setVigenciaFin(value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    id="outlined-number"
                    label="Unidades Fijas Mínimo"
                    type="number"
                    fullWidth
                    multiline
                    value={unidadesFijasMin}
                    onChange={event => setUnidadesFijasMin(event.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Unidades Fijas Máximo"
                    type="number"
                    fullWidth
                    multiline
                    value={unidadesFijasMax}
                    onChange={event => setUnidadesFijasMax(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button color="primary" disabled={props.cargando 
            || ley.trim() === ""
            || articulo.trim() === ""
            || extracto.trim() === ""
            || codigo.trim() === ""
            || unidadesFijasMin.trim() === ""
            || unidadesFijasMax.trim() === ""} onClick={() => props.agregarInfraccion(ley, articulo, inciso, extracto, codigo,
                vigenciaInicio,
                vigenciaFin,
                unidadesFijasMin,
                unidadesFijasMax)}>
                    Agregar
                    {props.cargando && <CircularProgress size={24} className={estilos.buttonProgress} />}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    mostrarDialog: state.agregarInfraccion.mostrarDialog,
    cargando: state.agregarInfraccion.cargando,
    exito: state.agregarInfraccion.exito,
    error: state.agregarInfraccion.error,
    textoDeError: state.agregarInfraccion.textoDeError,
});

const mapDispatchToProps = dispatch => ({
    agregarInfraccion: (ley, articulo, inciso, extracto, codigo,
        vigenciaInicio,
        vigenciaFin,
        unidadesFijasMin,
        unidadesFijasMax) => dispatch(agregarInfraccion(ley, articulo, inciso, extracto, codigo,
            vigenciaInicio,
            vigenciaFin,
            unidadesFijasMin,
            unidadesFijasMax)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgregarInfraccion);