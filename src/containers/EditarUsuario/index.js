import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Grid, DialogContentText, Select, MenuItem, InputLabel, CircularProgress, Tooltip } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { connect } from "react-redux";
import { editarUsuario } from "./actions";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier";
import useStyles from "../../share/useStyles";
import provincias from '../../share/provincias.json';
import localidades from '../../share/localidades.json'

const EditarUsuario = props => {
    const [rol, setRol] = useState("");
    const [dni, setDni] = useState("");
    const [apellido, setApellido] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date().toISOString().slice(0, 10));
    const [sexo, setSexo] = useState("Masculino");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [piso, setPiso] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [foto, setFoto] = useState([]);
    const [aceptable, setAceptable] = useState(false);

    const estilos = useStyles();

    // carga los datos del usuario a editar/todo vacio al abrir/cerrar el dialog
    useEffect(() => {
        if (props.editar) {
            setRol(props.usuario.rol);
            setDni(props.usuario.dni);
            setApellido(props.usuario.apellido);
            setNombre(props.usuario.nombre);
            setFechaNacimiento(props.usuario.fechaNacimiento);
            setSexo(props.usuario.sexo);
            setCalle(props.usuario.calle);
            setNumero(props.usuario.numero);
            setPiso(props.usuario.piso);
            setDepartamento(props.usuario.departamento);
            setProvincia(props.usuario.provincia);
            setLocalidad(props.usuario.localidad);
            setEmail(props.usuario.email);
            setTelefono(props.usuario.telefono);
        }
        else {
            setRol("");
            setDni("");
            setApellido("");
            setNombre("");
            setFechaNacimiento(new Date().toISOString().slice(0, 10));
            setSexo("Masculino");
            setCalle("");
            setNumero("");
            setPiso("");
            setDepartamento("");
            setLocalidad("");
            setProvincia("");
            setEmail("");
            setTelefono("");
            setFoto([]);
        }
    }, [props.mostrarDialog, props.editar]);

    // evalua si se pueden aceptar los cambios al completar todos los campos obligatorios
    useEffect(() => {
        if (
            rol.trim() !== "" &&
            dni.trim() !== "" &&
            dni.length >= 8 &&
            (dni % 1 == 0) &&
            apellido.trim() !== "" &&
            nombre.trim() !== "" &&
            fechaNacimiento.trim() !== "" &&
            calle.trim() !== "" &&
            localidad.trim() !== "" &&
            provincia.trim() !== "" &&
            email.trim() !== "" &&
            telefono.trim() !== ""
        ) {
            setAceptable(true);
        }
        else {
            setAceptable(false);
        }
    }, [rol, dni, apellido, nombre, fechaNacimiento, calle, localidad, provincia, email, telefono]);

    // resetea la localidad al cambiar la provincia
    useEffect(() => {
        setLocalidad('');
    }, [provincia]);

    // carga el radio que selecciona el usuario en el state
    const radioHandler = (event) => {
        setSexo(event.target.value);
    }

    // carga la foto subida en el state
    const imageUploadHandler = (files) => {
        setFoto(files[0]);
    }

    // ejecuta la action para mandar todo al backend
    const editarUsuarioHandler = () => {
        const usuario = {
            rol: rol,
            email: email,
            telefono: telefono,
            file: foto,
            dni: dni,
            apellido: apellido,
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            sexo: sexo,
            calle: calle,
            numero: numero,
            piso: piso,
            departamento: departamento,
            localidad: localidad,
            provincia: provincia,
        };
        let id = props.editar ? props.usuario.id : "";
        props.editarUsuario(id, usuario, props.editar);
    }
    const provinciaOptions = provincias.provincias
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .map(p => (
            <MenuItem value={p.nombre}>{p.nombre}</MenuItem>
        ));
    const localidadOptions = localidades.localidades
        .filter(l => l.provincia.nombre === provincia)
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .map(l => (
            <MenuItem value={l.nombre}>{l.nombre}</MenuItem>
        ));

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xl" fullWidth>
            <DialogTitle>
                {props.editar ? "Editar usuario " : "Agregar un nuevo usuario"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>* Campos obligatorios. Pase el cursor sobre algunos campos para más información.</DialogContentText>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl required fullWidth>
                            <InputLabel>Rol</InputLabel>
                            <Select id="rol" value={rol} onChange={event => setRol(event.target.value)}>
                                <MenuItem value="Administrador">Administrador</MenuItem>
                                <MenuItem value="Inspector">Inspector</MenuItem>
                                <MenuItem value="Supervisor">Supervisor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <FormLabel>Datos personales</FormLabel>
                            <Tooltip title="El número de DNI sin puntos. Mínimo 8 caracteres.">
                                <TextField
                                    id="dni"
                                    type="number"
                                    label="DNI"
                                    inputProps={{ minLength: 8 }}
                                    required
                                    value={dni}
                                    onChange={event => setDni(event.target.value)}
                                />
                            </Tooltip>
                            <TextField
                                id="apellido"
                                type="text"
                                label="Apellido"
                                required
                                value={apellido}
                                onChange={event => setApellido(event.target.value)}
                            />
                            <TextField
                                id="nombre"
                                type="text"
                                label="Nombre"
                                required
                                value={nombre}
                                onChange={event => setNombre(event.target.value)}
                            />
                            <TextField
                                id="fechaNacimiento"
                                type="date"
                                label="Fecha de nacimiento"
                                required
                                value={fechaNacimiento}
                                onChange={event => setFechaNacimiento(event.target.value)}
                            />
                            <FormLabel component="legend">Sexo</FormLabel>
                            <RadioGroup value={sexo} onChange={radioHandler}>
                                <FormControlLabel value="Masculino" label="Masculino" control={<Radio color="primary" />} />
                                <FormControlLabel value="Femenino" label="Femenino" control={<Radio color="primary" />} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <FormLabel>Dirección</FormLabel>
                            <Tooltip title="Si la calle del usuario no tiene nombre, escriba Calle sin nombre">
                                <TextField
                                    id="calle"
                                    type="text"
                                    label="Calle"
                                    required
                                    value={calle}
                                    onChange={event => setCalle(event.target.value)}
                                />
                            </Tooltip>
                            <Tooltip title="Si la casa del usuario no tiene número, deje vacío este campo">
                                <TextField
                                    id="numero"
                                    type="number"
                                    label="Número"
                                    value={numero}
                                    onChange={event => setNumero(event.target.value)}
                                />
                            </Tooltip>
                            <Tooltip title="Si el usuario no vive en un edificio, deje vacío este campo">
                                <TextField
                                    id="piso"
                                    type="number"
                                    label="Piso"
                                    inputProps={{ min: 0 }}
                                    value={piso}
                                    onChange={event => setPiso(event.target.value)}
                                />
                            </Tooltip>
                            <Tooltip title="Si el usuario no vive en un edificio, deje vacío este campo">
                                <TextField
                                    id="departamento"
                                    label="Departamento"
                                    value={departamento}
                                    onChange={event => setDepartamento(event.target.value)}
                                />
                            </Tooltip>
                            <FormControl required>
                                <InputLabel id="provinciaLabel">Provincia</InputLabel>
                                <Select
                                    id="provincia"
                                    labelId="provinciaLabel"
                                    label="Provincia"
                                    required
                                    value={provincia}
                                    onChange={event => setProvincia(event.target.value)}
                                >
                                    {provinciaOptions}
                                </Select>
                            </FormControl>
                            <Tooltip title={provincia ? '' : 'Seleccione una provincia antes de elegir una localidad.'}>
                                <FormControl required>
                                    <InputLabel id="localidadLabel">Localidad</InputLabel>
                                    <Select
                                        id="localidad"
                                        labelId="localidadLabel"
                                        label="Localidad"
                                        required
                                        disabled={!provincia}
                                        value={localidad}
                                        onChange={event => setLocalidad(event.target.value)}
                                    >
                                        {localidadOptions}
                                    </Select>
                                </FormControl>
                            </Tooltip>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <FormLabel>Cuenta</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                label="Correo electrónico"
                                required
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <Tooltip title="El formato del teléfono es: +54 + código de área (sin 0) + número (sin 15)">
                                <TextField
                                    id="telefono"
                                    type="phone"
                                    label="Teléfono"
                                    required
                                    value={telefono}
                                    onChange={event => setTelefono(event.target.value)}
                                />
                            </Tooltip>
                            <FormLabel component="legend">Foto</FormLabel>
                            <DropzoneArea
                                dropzoneText="Cargue aquí la foto"
                                acceptedFiles={["image/*"]}
                                filesLimit={1}
                                onChange={imageUploadHandler.bind(this)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button onClick={editarUsuarioHandler} color="primary" disabled={props.cargando || !aceptable}>
                    Aceptar
                    {props.cargando && <CircularProgress size={24} className={estilos.buttonProgress} />}
                </Button>
            </DialogActions>
            <Notifier />
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario.usuario,
        mostrarDialog: state.editarUsuario.mostrarDialog,
        cargando: state.editarUsuario.cargando,
        exito: state.editarUsuario.exito,
        error: state.editarUsuario.error,
        textoDeError: state.editarUsuario.textoDeError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editarUsuario: (id, usuario, editar) => {dispatch(editarUsuario(id, usuario, editar))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EditarUsuario));