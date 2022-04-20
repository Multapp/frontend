import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip } from "@material-ui/core";
import { Delete, Gavel, Edit, Save, Cancel } from "@material-ui/icons";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Fragment } from "react";

const Infracciones = props => {
    const [show, setShow] = useState(false);
    const [showAdd , setShowAdd ] = useState(false);
    const [showEditarInfracciones, setShowEditarInfracciones] = useState(false);
    const [modelToEdit, setModelToEdit] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const onCancelEdit = () => {
        setModelToEdit(null);
        setShowEditarInfracciones(false);
        setShowAdd (false);
        setEditingValue('');
    };

    const onToggleEditInfracciones = () => {
        onCancelEdit();
        setShowEditarInfracciones(true);
        setEditingValue(props.infracciones);
    };

    const onToggleAddInfracciones = () => {
        onCancelEdit();
        setShowAdd (true);
    };

    const onEditInfracciones = () => {
        const { id, ...rest } = props.infracciones;
        props.onUpdateInfracciones(id, {
            ...rest,
            infracciones: editingValue
        });
        onCancelEdit();
    }

    return (
        <Fragment>
            <ListItem button onClick={() => setShow(!show)}>
                <ListItemAvatar>
                    <Avatar>
                        <Gavel />
                    </Avatar>
                </ListItemAvatar>
                {showEditarInfracciones ? (
                    <TextField
                        size="small"
                        value={editingValue}
                        onChange={e => setEditingValue(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <ListItemText
                        primary={"Ley " + props.infraccion.ley + " - Art. " + props.infraccion.articulo + " - Inciso " + props.infraccion.inciso}
                        secondary={`Extracto: ${props.extracto}`}
                    />
                )}
                <ListItemSecondaryAction>
                    {showEditarInfracciones ? (
                        <>
                            <Tooltip title="Guardar">
                                <IconButton disabled={!editingValue} onClick={onEditInfracciones}>
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
                        <Tooltip title="Editar la Infraccion">
                            <IconButton onClick={onToggleEditInfracciones}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Borrar Infracciones">
                        <IconButton onClick={props.onDeleteInfraccion}>
                            <Delete onClick={props.onDeleteInfraccion} />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </Fragment>
    );
};

export default Infracciones;