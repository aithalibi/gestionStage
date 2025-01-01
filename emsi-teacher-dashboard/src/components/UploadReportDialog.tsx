import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  LinearProgress,
  Alert,
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

interface UploadReportDialogProps {
  open: boolean;
  onClose: () => void;
  studentName: string;
  studentId: number;
}

const UploadReportDialog: React.FC<UploadReportDialogProps> = ({
  open,
  onClose,
  studentName,
  studentId,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Veuillez sélectionner un fichier PDF');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Créer un FormData pour l'upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('studentId', studentId.toString());
      formData.append('comments', comments);

      // Simuler un appel API - À remplacer par votre vrai appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Exemple d'appel API :
      /*
      const response = await fetch('/api/upload-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }
      */

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setSelectedFile(null);
        setComments('');
      }, 1500);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'upload du fichier');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Upload du Rapport - {studentName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Rapport uploadé avec succès !
            </Alert>
          )}
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              mb: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
            component="label"
          >
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileSelect}
            />
            <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Déposez votre fichier PDF ici
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ou cliquez pour sélectionner
            </Typography>
            {selectedFile && (
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                Fichier sélectionné : {selectedFile.name}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            label="Commentaires"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={uploading}
          />
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Annuler
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!selectedFile || uploading}
          startIcon={<UploadIcon />}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadReportDialog;
