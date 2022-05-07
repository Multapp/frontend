import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

const EditInfraccion = ({ openParam, onCloseModal, infraccionEdit, updateInfra }) => {
  const id = infraccionEdit.id;
  const [ley, setLey] = useState(infraccionEdit.ley || "");
  const [codigo, setCodigo] = useState(infraccionEdit.codigo || "");
  const [articulo, setArticulo] = useState(infraccionEdit.articulo || "");
  const [inciso, setInciso] = useState(infraccionEdit.inciso || "");
  const [extracto, setExtracto] = useState(infraccionEdit.extracto || "");

  const [unidadesFijasMin, setUnidadesFijasMin] = useState(
    infraccionEdit.unidadesFijasMin || ""
  );
  const [unidadesFijasMax, setUnidadesFijasMax] = useState(
    infraccionEdit.unidadesFijasMax || ""
  );

  const [vigenciaInicio, setVigenciaInicio] = useState(
    infraccionEdit.vigencianIcio || ""
  );
  const [vigenciaFin, setVigenciaFin] = useState(
    infraccionEdit.vigenciaFin || ""
  );
  const closeModal = () => {
    setLey('');
    setCodigo('');
    setArticulo('');
    setInciso('');
    setExtracto('');
    setUnidadesFijasMin('');
    setUnidadesFijasMax('');
    setVigenciaInicio('');
    setVigenciaFin('');
    onCloseModal();
  };

  const editInfraccion = async () => {
    
    const data = {
      ley,
      codigo,
      articulo,
      inciso,
      extracto,
      unidadesFijasMin,
      unidadesFijasMax,
      vigenciaInicio,
      vigenciaFin,
    };

    try {
      updateInfra(id, data);
    } catch (error) {
      console.log(error);
    }
    closeModal()
  };

  return (
    <Dialog open={openParam} onClose={closeModal}>
      <DialogTitle>Editar Infraccion</DialogTitle>
      <DialogContent>
        <TextField
          name="Ley"
          label="Ley"
          value={ley}
          fullWidth
          onChange={(event) => setLey(event.target.value)}
        />
        <TextField
          name="Codigo"
          label="Código"
          value={codigo}
          fullWidth
          onChange={(event) => setCodigo(event.target.value)}
        />
        <TextField
          name="Articulo"
          label="Articulo"
          value={articulo}
          fullWidth
          onChange={(event) => setArticulo(event.target.value)}
        />

        <TextField
          name="Inciso"
          label="Inciso"
          value={inciso}
          fullWidth
          onChange={(event) => setInciso(event.target.value)}
        />

        <TextField
          name="Extracto"
          label="Extracto"
          value={extracto}
          fullWidth
          onChange={(event) => setExtracto(event.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Entrada en Vigencia"
            value={vigenciaInicio}
            onChange={(value) => setVigenciaInicio(value)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Fin de Vigencia"
            value={vigenciaFin}
            onChange={(value) => setVigenciaFin(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          name="Minimo"
          label="Unidades Fijas Mínimo"
          type="number"
          value={unidadesFijasMin}
          fullWidth
          multiline
          onChange={(event) => setUnidadesFijasMin(event.target.value)}
        />
        <TextField
          name="Maximo"
          label="Unidades Fijas Máximo"
          type="number"
          value={unidadesFijasMax}
          fullWidth
          multiline
          onChange={(event) => setUnidadesFijasMax(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button color="primary" onClick={editInfraccion}>
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditInfraccion;
