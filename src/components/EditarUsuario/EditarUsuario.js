import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Grid, DialogContentText, Select, MenuItem, InputLabel, CircularProgress } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { connect } from "react-redux";
import { editarUsuario } from "../../store/actions/editarUsuario";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier/Notifier";
import useStyles from "../../share/useStyles";

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
            setLocalidad(props.usuario.localidad);
            setProvincia(props.usuario.provincia);
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

    // carga el radio que selecciona el usuario en el state
    const radioHandler = (event) => {
        setSexo(event.target.value);
    }

    // carga lo que selecciona el usuario en el select en el state
    const selectHandler = (event) => {
        setRol(event.target.value);
    }

    // carga la foto subida en el state
    const imageUploadHandler = (files) => {
        setFoto(files);
    }

    const editarUsuarioHandler = () => {
        const usuario = {
            rol: rol,
            email: email,
            telefono: telefono,
            foto: foto,
            datos: {
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
            }
        };
        let id = props.editar ? props.usuario.id : "";
        props.editarUsuario(id, usuario, props.editar);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xl" fullWidth={true}>
            <DialogTitle>
                {props.editar ?
                    "Editar usuario " + props.usuario.id
                    : "Agregar un nuevo usuario"
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>* Campos obligatorios</DialogContentText>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel>Rol</InputLabel>
                            <Select id="rol" value={rol} onChange={selectHandler}>
                                <MenuItem value="Administrador">Administrador</MenuItem>
                                <MenuItem value="Inspector">Inspector</MenuItem>
                                <MenuItem value="Supervisor">Supervisor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel>Datos personales</FormLabel>
                            <TextField
                                id="dni"
                                type="number"
                                label="DNI"
                                required={true}
                                value={dni}
                                onChange={event => setDni(event.target.value)}
                            />
                            <TextField
                                id="apellido"
                                type="text"
                                label="Apellido"
                                required={true}
                                value={apellido}
                                onChange={event => setApellido(event.target.value)}
                            />
                            <TextField
                                id="nombre"
                                type="text"
                                label="Nombre"
                                required={true}
                                value={nombre}
                                onChange={event => setNombre(event.target.value)}
                            />
                            <TextField
                                id="fechaNacimiento"
                                type="date"
                                label="Fecha de nacimiento"
                                required={true}
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
                    <Grid item={true} xs={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel>Dirección</FormLabel>
                            <TextField
                                id="calle"
                                type="text"
                                label="Calle"
                                required={true}
                                value={calle}
                                onChange={event => setCalle(event.target.value)}
                            />
                            <TextField
                                id="numero"
                                type="number"
                                label="Número"
                                value={numero}
                                onChange={event => setNumero(event.target.value)}
                            />
                            <TextField
                                id="piso"
                                type="text"
                                label="Piso"
                                value={piso}
                                onChange={event => setPiso(event.target.value)}
                            />
                            <TextField
                                id="departamento"
                                type="text"
                                label="Departamento"
                                value={departamento}
                                onChange={event => setDepartamento(event.target.value)}
                            />
                            <TextField
                                id="localidad"
                                type="text"
                                label="Localidad"
                                required={true}
                                value={localidad}
                                onChange={event => setLocalidad(event.target.value)}
                            />
                            <TextField
                                id="provincia"
                                type="text"
                                label="Provincia"
                                required={true}
                                value={provincia}
                                onChange={event => setProvincia(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel>Cuenta</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                label="Correo electrónico"
                                required={true}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <TextField
                                id="telefono"
                                type="phone"
                                label="Teléfono"
                                required={true}
                                value={telefono}
                                onChange={event => setTelefono(event.target.value)}
                            />
                            <FormLabel component="legend">Foto</FormLabel>
                            <DropzoneArea
                                dropzoneText="No se cargó foto"
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