import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import stageService, { Stage } from '../services/internshipService';

const PFAManagement: React.FC = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStage, setSelectedStage] = useState<Partial<Stage> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadStages();
  }, []);

  const loadStages = async () => {
    try {
      const data = await stageService.getStages('PFA');
      setStages(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des PFA');
      console.error('Error loading stages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (stage?: Stage) => {
    if (stage) {
      setSelectedStage(stage);
      setIsEditing(true);
    } else {
      setSelectedStage({
        type: 'PFA',
        status: 'EN_ATTENTE'
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStage(null);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (!selectedStage) return;

    try {
      if (isEditing && selectedStage.id) {
        await stageService.updateStage(selectedStage.id, selectedStage);
      } else {
        await stageService.createStage(selectedStage);
      }
      handleCloseDialog();
      loadStages();
    } catch (err) {
      console.error('Error saving stage:', err);
      setError('Erreur lors de l\'enregistrement du stage');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      try {
        await stageService.deleteStage(id);
        loadStages();
      } catch (err) {
        console.error('Error deleting stage:', err);
        setError('Erreur lors de la suppression du stage');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedStage(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestion des PFA
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouveau PFA
        </Button>
      </Box>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sujet</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Étudiant</TableCell>
              <TableCell>Encadrant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stages.map((stage) => (
              <TableRow key={stage.id}>
                <TableCell>{stage.sujet}</TableCell>
                <TableCell>{stage.description}</TableCell>
                <TableCell>
                  {stage.etudiant 
                    ? `${stage.etudiant.nom} ${stage.etudiant.prenom}`
                    : 'Non assigné'}
                </TableCell>
                <TableCell>
                  {stage.encadrant
                    ? `${stage.encadrant.nom} ${stage.encadrant.prenom}`
                    : 'Non assigné'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={stage.status}
                    color={
                      stage.status === 'TERMINE' ? 'success' :
                      stage.status === 'EN_COURS' ? 'primary' :
                      'default'
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(stage)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => stage.id && handleDelete(stage.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Modifier le PFA' : 'Nouveau PFA'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Sujet"
              name="sujet"
              value={selectedStage?.sujet || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={selectedStage?.description || ''}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              label="Date de début"
              name="dateDebut"
              type="date"
              value={selectedStage?.dateDebut || ''}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date de fin"
              name="dateFin"
              type="date"
              value={selectedStage?.dateFin || ''}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Status"
              name="status"
              select
              value={selectedStage?.status || 'EN_ATTENTE'}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="EN_ATTENTE">En attente</MenuItem>
              <MenuItem value="EN_COURS">En cours</MenuItem>
              <MenuItem value="TERMINE">Terminé</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PFAManagement;
