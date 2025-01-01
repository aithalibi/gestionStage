import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

interface Report {
  id: number;
  studentName: string;
  reportTitle: string;
  submissionDate: string;
  status: 'pending' | 'reviewed';
  fileUrl: string;
  observations?: string;
}

// Données de démonstration
const mockReports: Report[] = [
  {
    id: 1,
    studentName: 'Ahmed Alami',
    reportTitle: 'Rapport PFE - Développement Web',
    submissionDate: '2024-12-28',
    status: 'pending',
    fileUrl: '/reports/rapport1.pdf',
  },
  {
    id: 2,
    studentName: 'Sara Bennani',
    reportTitle: 'Rapport PFA - Intelligence Artificielle',
    submissionDate: '2024-12-29',
    status: 'reviewed',
    fileUrl: '/reports/rapport2.pdf',
    observations: 'Améliorer la partie méthodologie. Ajouter plus de références.',
  },
];

const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [observations, setObservations] = useState('');

  const handleDownload = (report: Report) => {
    // Ici, vous implémenterez la logique de téléchargement avec votre backend
    console.log('Téléchargement du rapport:', report.fileUrl);
  };

  const handleOpenObservations = (report: Report) => {
    setSelectedReport(report);
    setObservations(report.observations || '');
    setOpenDialog(true);
  };

  const handleSaveObservations = () => {
    if (selectedReport) {
      // Ici, vous implémenterez l'appel API pour sauvegarder les observations
      setReports(reports.map(report => 
        report.id === selectedReport.id
          ? { ...report, observations, status: 'reviewed' as const }
          : report
      ));
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Gestion des Rapports
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Étudiant</TableCell>
              <TableCell sx={{ color: 'white' }}>Titre du Rapport</TableCell>
              <TableCell sx={{ color: 'white' }}>Date de Soumission</TableCell>
              <TableCell sx={{ color: 'white' }}>Statut</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.studentName}</TableCell>
                <TableCell>{report.reportTitle}</TableCell>
                <TableCell>{report.submissionDate}</TableCell>
                <TableCell>
                  <Chip
                    label={report.status === 'pending' ? 'En attente' : 'Corrigé'}
                    color={report.status === 'pending' ? 'warning' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDownload(report)}
                    title="Télécharger le rapport"
                  >
                    <DownloadIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenObservations(report)}
                    title={report.status === 'pending' ? 'Ajouter des observations' : 'Voir/Modifier les observations'}
                  >
                    {report.status === 'pending' ? (
                      <EditIcon color="primary" />
                    ) : (
                      <ViewIcon color="primary" />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pour les observations */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedReport?.status === 'pending'
            ? 'Ajouter des Observations'
            : 'Modifier les Observations'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Rapport: {selectedReport?.reportTitle}
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
              Étudiant: {selectedReport?.studentName}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Points à améliorer et observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button
            onClick={handleSaveObservations}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportManagement;
