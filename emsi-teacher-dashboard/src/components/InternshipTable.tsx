import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Description as ReportIcon,
} from '@mui/icons-material';
import UploadReportDialog from './UploadReportDialog';

interface Student {
  id: number;
  name: string;
  email: string;
  company: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  status: string;
  hasReport: boolean;
}

interface Props {
  type: 'PFE' | 'PFA';
}

const InternshipTable: React.FC<Props> = ({ type }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Récupérer les étudiants affectés à l'enseignant connecté
  useEffect(() => {
    fetchStudents();
  }, [type]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Pour le développement, utilisons des données mockées
      const mockData: Student[] = [
        {
          id: 1,
          name: 'Mohammed Alami',
          email: 'mohammed.alami@student.emsi.ma',
          company: 'Tech Solutions',
          supervisor: 'Ahmed Benani',
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          status: 'En cours',
          hasReport: false
        },
        {
          id: 2,
          name: 'Fatima Zohra',
          email: 'fatima.zohra@student.emsi.ma',
          company: 'Digital Agency',
          supervisor: 'Sara Kadiri',
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          status: 'En cours',
          hasReport: true
        },
      ];

      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudents(mockData);

      // Quand l'API sera prête, utilisez ce code :
      /*
      const response = await fetch(`/api/teacher/students?type=${type}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des étudiants');
      }

      const data = await response.json();
      setStudents(data);
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = async (studentId: number) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      setStudents(students.filter(student => student.id !== studentId));

      // Quand l'API sera prête, utilisez ce code :
      /*
      const response = await fetch(`/api/internships/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setStudents(students.filter(student => student.id !== studentId));
      */
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleSave = async () => {
    if (!selectedStudent) return;

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      setStudents(students.map(student => 
        student.id === selectedStudent.id ? selectedStudent : student
      ));
      setOpenDialog(false);

      // Quand l'API sera prête, utilisez ce code :
      /*
      const response = await fetch(`/api/internships/${selectedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(selectedStudent),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      const updatedStudent = await response.json();
      setStudents(students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      ));
      setOpenDialog(false);
      */
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleUpload = (student: Student) => {
    setSelectedStudent(student);
    setOpenUploadDialog(true);
  };

  const handleUploadClose = () => {
    setOpenUploadDialog(false);
    setSelectedStudent(null);
    fetchStudents(); // Rafraîchir la liste après l'upload
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'primary';
      case 'Terminé':
        return 'success';
      case 'Non commencé':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Gestion des Stages {type}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Étudiant</TableCell>
              <TableCell sx={{ color: 'white' }}>Entreprise</TableCell>
              <TableCell sx={{ color: 'white' }}>Encadrant</TableCell>
              <TableCell sx={{ color: 'white' }}>Période</TableCell>
              <TableCell sx={{ color: 'white' }}>Statut Stage</TableCell>
              <TableCell sx={{ color: 'white' }}>Rapport</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {student.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {student.email}
                  </Typography>
                </TableCell>
                <TableCell>{student.company}</TableCell>
                <TableCell>{student.supervisor}</TableCell>
                <TableCell>
                  <Typography variant="caption">
                    Du: {new Date(student.startDate).toLocaleDateString()}
                  </Typography>
                  <br />
                  <Typography variant="caption">
                    Au: {new Date(student.endDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    color={getStatusColor(student.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    icon={<ReportIcon />}
                    label={student.hasReport ? "Rapport présent" : "Pas de rapport"}
                    color={student.hasReport ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleView(student)}
                    title="Voir les détails"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(student)}
                    title="Modifier"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(student.id)}
                    title="Supprimer"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleUpload(student)}
                    title="Upload le rapport"
                  >
                    <UploadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pour voir/modifier les détails */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Modifier le stage' : 'Détails du stage'}
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
              <TextField
                label="Nom de l'étudiant"
                value={selectedStudent.name}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="Email"
                value={selectedStudent.email}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="Entreprise"
                value={selectedStudent.company}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, company: e.target.value })}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="Encadrant"
                value={selectedStudent.supervisor}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, supervisor: e.target.value })}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="Date de début"
                value={selectedStudent.startDate}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, startDate: e.target.value })}
                disabled={!editMode}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Date de fin"
                value={selectedStudent.endDate}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, endDate: e.target.value })}
                disabled={!editMode}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fermer</Button>
          {editMode && (
            <Button onClick={handleSave} variant="contained" color="primary">
              Enregistrer
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog pour l'upload du rapport */}
      {selectedStudent && (
        <UploadReportDialog
          open={openUploadDialog}
          onClose={handleUploadClose}
          studentName={selectedStudent.name}
          studentId={selectedStudent.id}
        />
      )}
    </Box>
  );
};

export default InternshipTable;
