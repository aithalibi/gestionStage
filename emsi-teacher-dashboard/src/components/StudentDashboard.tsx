import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface Rapport {
  id: string;
  titre: string;
  dateCreation: string;
  statut: string;
}

// Données de test
const rapportsTest: Rapport[] = [
  {
    id: '1',
    titre: 'Rapport PFE 2024',
    dateCreation: '2024-01-02',
    statut: 'En cours'
  },
  {
    id: '2',
    titre: 'Rapport Stage 2023',
    dateCreation: '2023-12-15',
    statut: 'Terminé'
  }
];

const StudentDashboard = () => {
  const [rapports] = useState<Rapport[]>(rapportsTest);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Fichier sélectionné:', file.name);
      // Simulation d'upload
      alert('Rapport soumis avec succès !');
    }
  };

  const handleDownload = (rapportId: string) => {
    console.log('Téléchargement du rapport:', rapportId);
    // Simulation de téléchargement
    alert('Téléchargement simulé');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Étudiant
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Soumettre un nouveau rapport
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Choisir un fichier
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
        </Button>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Mes Rapports
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Date de création</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rapports.map((rapport) => (
                <TableRow key={rapport.id}>
                  <TableCell>{rapport.titre}</TableCell>
                  <TableCell>{rapport.dateCreation}</TableCell>
                  <TableCell>{rapport.statut}</TableCell>
                  <TableCell>
                    <Tooltip title="Télécharger">
                      <IconButton
                        onClick={() => handleDownload(rapport.id)}
                        color="primary"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StudentDashboard;
