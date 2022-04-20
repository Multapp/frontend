import { Avatar, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip } from "@material-ui/core";
import { Add, Delete, Gavel, Edit, Save, Cancel } from "@material-ui/icons";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Fragment } from "react";

const Infraccion = props => {
    const [show, setShow] = useState(false);
    const [showAddInfraccion, setShowAddInfraccion] = useState(false);
    const [showEditarInfraccion, setShowEditarInfraccion] = useState(false);
    const [infraccionToEdit, setInfraccionToEdit] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const onCancelEdit = () => {
        setInfraccionToEdit(null);
        setShowEditarInfraccion(false);
        setShowAddInfraccion(false);
        setEditingValue('');
    };

    const onToggleEdit = infraccion => {
        onCancelEdit();
        setInfraccionToEdit(infraccion);
        setEditingValue(infraccion);
    };

    const onToggleEditInfraccion = () => {
        onCancelEdit();
        setShowEditarInfraccion(true);
        setEditingValue(props.infraccion);
    };

    const onToggleAddInfraccion = () => {
        onCancelEdit();
        setShowAddInfraccion(true);
    };

    const onEditMarca = () => {
        const { id, ...rest } = props.infraccion;
        props.onUpdateInfraccion(id, {
            ...rest,
            infraccion: editingValue
        });
        onCancelEdit();
    }

    const onAddInfraccion = () => {
        const { id, ...rest } = props.infraccion;
        props.onUpdateMarca(id, {
            ...rest,
            modelos: [...rest.modelos, editingValue]
        });
        onCancelEdit();
    };

    const onDeleteInfraccion = modelo => {
        const { id, ...rest } = props.vehiculo;
        props.onUpdateMarca(id, {
            ...rest,
            modelos: rest.modelos.filter(m => m !== modelo)
        });
        onCancelEdit();
    };

    return (
        <Fragment>
            <ListItem button onClick={() => setShow(!show)}>
                <ListItemAvatar>
                    <Avatar>
                        <Gavel />
                    </Avatar>
                </ListItemAvatar>
                {showEditarInfraccion ? (
                    <TextField
                        size="small"
                        value={editingValue}
                        onChange={e => setEditingValue(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <ListItemText
                        primary={props.infraccion.ley + " Art." + props.infraccion.articulo + "Inciso " + props.infraccion.inciso}
                        secondary={`Extracto: ${props.extracto}`}
                    />
                )}
                <ListItemSecondaryAction>
                    {showEditarMarca ? (
                        <>
                            <Tooltip title="Guardar">
                                <IconButton disabled={!editingValue} onClick={onEditInfraccion}>
                                    <Save />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancelar">
                                <IconButton onClick={onCancelEdit}>
                                    <Cancel />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Editar nombre de la infraccion">
                            <IconButton onClick={onToggleEditInfraccion}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Borrar infraccion">
                        <IconButton onClick={props.onDeleteInfraccion}>
                            <Delete onClick={props.onDeleteInfraccion} />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={show}>
                <List>
                    {props.infraccion.modelos.sort((a, b) => a.localeCompare(b)).map(modelo => (
                        <ListItem divider>
                            {modelToEdit === modelo ? (
                                <TextField
                                    size="small"
                                    value={editingValue}
                                    onChange={e => setEditingValue(e.target.value)}
                                    autoFocus
                                />
                            ) : <ListItemText primary={modelo} />}
                            <ListItemSecondaryAction>
                                {modelToEdit === modelo ? (
                                    <>
                                        <Tooltip title="Guardar">
                                            <IconButton disabled={!editingValue} onClick={onEditModelo}>
                                                <Save />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cancelar">
                                            <IconButton onClick={onCancelEdit}>
                                                <Cancel />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Tooltip title="Editar modelo">
                                        <IconButton onClick={() => onToggleEdit(modelo)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Tooltip title="Borrar modelo">
                                    <IconButton onClick={() => onDeleteModelo(modelo)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    <ListItem>
                        {showAddInfraccion ? (
                            <>
                                <TextField
                                    label="Ley"
                                    size="small"
                                    value={editingValue}
                                    onChange={e => setEditingValue(e.target.value)}
                                    autoFocus
                                />
                                <TextField
                                    label="Articulo"
                                    size="small"
                                    value={editingValue}
                                    onChange={e => setEditingValue(e.target.value)}
                                    autoFocus
                                />
                                <TextField
                                    label="Inciso"
                                    size="small"
                                    value={editingValue}
                                    onChange={e => setEditingValue(e.target.value)}
                                    autoFocus
                                />
                                <TextField
                                    label="Extracto"
                                    size="small"
                                    value={editingValue}
                                    onChange={e => setEditingValue(e.target.value)}
                                    autoFocus
                                />

                                <ListItemSecondaryAction>
                                    <Tooltip title="Guardar">
                                        <IconButton disabled={!editingValue} onClick={onAddModelo}>
                                            <Save />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancelar">
                                        <IconButton onClick={onCancelEdit}>
                                            <Cancel />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </>
                        ) : (
                            <Button variant="text" startIcon={<Add />} onClick={onToggleAddInfraccion}>
                                Agregar modelo
                            </Button>
                        )}
                    </ListItem>
                </List>
            </Collapse>
        </Fragment>
    );
};

export default Infraccion;