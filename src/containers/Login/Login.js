import React, { Component, Fragment } from "react";
import Logo from "../../components/Logo/Logo";
import { Container, Typography, FormControl, TextField, Button, Grid, Paper } from "@material-ui/core";
import { login, recuperarContrasena } from "../../store/actions/login";
import { connect } from "react-redux";
import { traducirError } from "../../share/traducirError";

class Login extends Component {
    state = {
        email: "",
        contrasena: "",
        mostrarIniciarSesion: true,
        contrasenaIncorrecta: false,
    }

    // metodo para mostrar/ocultar el cuadro de recuperar contraseña
    olvidarContrasenaHandler = () => {
        const nuevoEstado = !this.state.mostrarIniciarSesion;
        this.setState({mostrarIniciarSesion: nuevoEstado});
    }

    // carga lo que escribe el usuario en el state
    inputHandler = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    render() {
        const iniciarSesion = (
            <Fragment>
                <Grid item={true} xs={12}>
                    <Typography align="center">Iniciar sesión en MultApp</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            type="email"
                            label="Correo electrónico"
                            value={this.state.email}
                            onChange={this.inputHandler}
                        />
                        <TextField
                            id="contrasena"
                            type="password"
                            label="Contraseña"
                            value={this.state.contrasena}
                            onChange={this.inputHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.login(this.state.email, this.state.contrasena)}
                    >
                        Iniciar sesión
                    </Button>
                    <Button
                        fullWidth={true}
                        color="primary"
                        onClick={this.olvidarContrasenaHandler}
                    >
                        Olvidé mi contraseña
                    </Button>
                </Grid>
            </Fragment>
        );
        const recuperarContrasena = (
            <Fragment>
                <Grid item={true} xs={12}>
                    <Typography align="center">
                        Si no recuerda su contraseña, ingrese su correo electrónico y le enviaremos una nueva para que pueda iniciar sesión
                    </Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="email"
                            type="email"
                            label="Correo electrónico"
                            value={this.state.email}
                            onChange={this.inputHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.recuperarContrasena(this.state.email)}
                    >
                        Recuperar contraseña
                    </Button>
                    <Button
                        fullWidth={true}
                        color="primary"
                        onClick={this.olvidarContrasenaHandler}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Fragment>
        );
        return (
            <Container>
                <Grid
                    container={true}
                    spacing={0}
                    alignContent="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item={true} xs={3}>
                        <Paper elevation={3} style={{padding: "8px"}}>
                            <Grid container={true} spacing={1} direction="column">
                                <Grid item={true} xs={12}>
                                    <Logo width={100} height={100} />
                                </Grid>
                                {this.props.error !== "" ?
                                    <Grid item={true} xs={12}>
                                        <Typography align="center" variant="body2" color="error">
                                            {traducirError(this.props.error)}
                                        </Typography>
                                    </Grid>
                                : null}
                                {this.state.mostrarIniciarSesion ? iniciarSesion : recuperarContrasena}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        cargando: state.login.cargando,
        error: state.login.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, contrasena) => dispatch(login(email, contrasena)),
        recuperarContrasena: (email) => dispatch(recuperarContrasena(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);