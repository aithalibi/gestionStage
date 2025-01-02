import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

interface Etudiant {
  id: string;
  nom: string;
  type: 'PFE' | 'PFA';
  sujet: string;
  duree: string;
  dateDebut: string;
  encadrant: string;
  avancement: number;
  technologies: string[];
  entreprise?: string;
}

// Données de test
const etudiantsTest: Etudiant[] = [
  {
    id: '1',
    nom: 'Mohammed Alami',
    type: 'PFE',
    sujet: 'Développement d\'une application web de gestion de stages',
    duree: '6 mois',
    dateDebut: '2024-01-02',
    encadrant: 'Dr. Hassan Bennani',
    avancement: 25,
    technologies: ['React', 'Node.js', 'MongoDB'],
    entreprise: 'SQLI'
  },
  {
    id: '2',
    nom: 'Sara Benani',
    type: 'PFE',
    sujet: 'Intelligence Artificielle pour la détection d\'objets',
    duree: '6 mois',
    dateDebut: '2024-01-15',
    encadrant: 'Dr. Hassan Bennani',
    avancement: 15,
    technologies: ['Python', 'TensorFlow', 'OpenCV'],
    entreprise: 'IBM'
  },
  {
    id: '3',
    nom: 'chaimaa qchiine',
    type: 'PFA',
    sujet: 'ai/data',
    duree: '3 mois',
    dateDebut: '2024-02-01',
    encadrant: 'mme hajar sitti',
    avancement: 75,
    technologies: ['Python', 'react']
  },
  {
    id: '4',
    nom: 'Yassine Idrissi',
    type: 'PFA',
    sujet: 'Application mobile de suivi sportif',
    duree: '3 mois',
    dateDebut: '2024-02-01',
    encadrant: 'Dr. Hassan Bennani',
    avancement: 0,
    technologies: ['Flutter', 'Firebase']
  },
  {
    id: '5',
    nom: 'Fatima Zahra El Amrani',
    type: 'PFA',
    sujet: 'Système de recommandation de films',
    duree: '3 mois',
    dateDebut: '2024-02-01',
    encadrant: 'Dr. Hassan Bennani',
    avancement: 5,
    technologies: ['Python', 'scikit-learn', 'Flask']
  }
];

const PFEManagement = () => {
  const [tabValue, setTabValue] = useState<'PFE' | 'PFA'>('PFE');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'PFE' | 'PFA') => {
    setTabValue(newValue);
  };

  const filteredEtudiants = etudiantsTest.filter(etudiant => 
    etudiant.type === tabValue &&
    (searchTerm === '' || 
      etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.technologies.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  const getAvancementColor = (avancement: number) => {
    if (avancement < 30) return 'error';
    if (avancement < 70) return 'warning';
    return 'success';
  };

  const getStatistiques = () => {
    const etudiants = etudiantsTest.filter(e => e.type === tabValue);
    const avancementMoyen = etudiants.reduce((acc, curr) => acc + curr.avancement, 0) / etudiants.length;
    return {
      total: etudiants.length,
      avancementMoyen: Math.round(avancementMoyen),
      enCours: etudiants.filter(e => e.avancement > 0 && e.avancement < 100).length
    };
  };

  const stats = getStatistiques();

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
          Gestion des Stages
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Tableau de bord de suivi des stages {tabValue}
        </Typography>
      </Box>

      {/* Cartes de statistiques */}
      <Grid container spacing={3} sx={{ mb: 4, px: 2 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            bgcolor: 'primary.light', 
            color: 'white',
            height: '100%',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4
            }
          }}>
            <CardContent sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              p: 3
            }}>
              <GroupIcon sx={{ fontSize: 40, color: 'white', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {stats.total}
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>
                  Étudiants en {tabValue}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            bgcolor: 'secondary.main', 
            color: 'white',
            height: '100%',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4
            }
          }}>
            <CardContent sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              p: 3
            }}>
              <TimelineIcon sx={{ fontSize: 40, color: 'white', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {stats.avancementMoyen}%
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>
                  Avancement moyen
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            bgcolor: 'primary.dark', 
            color: 'white',
            height: '100%',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4
            }
          }}>
            <CardContent sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              p: 3
            }}>
              <SchoolIcon sx={{ fontSize: 40, color: 'white', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {stats.enCours}
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>
                  Stages en cours
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3, overflow: 'hidden', mx: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: 'primary.main',
          borderRadius: '4px 4px 0 0',
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ 
              '& .MuiTab-root': { 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'none',
                minHeight: 48,
                py: 1,
              },
              '& .Mui-selected': { 
                color: 'white !important',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
                height: 3,
              }
            }}
          >
            <Tab label="PFE" value="PFE" />
            <Tab label="PFA" value="PFA" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher par nom, sujet ou technologie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              maxWidth: 600,
              mx: 'auto',
              display: 'block',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  '& .MuiTableCell-head': {
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    borderBottom: 2,
                    borderColor: 'primary.main',
                    bgcolor: 'primary.light',
                  }
                }}>
                  <TableCell>Étudiant</TableCell>
                  <TableCell>Sujet</TableCell>
                  <TableCell>Durée</TableCell>
                  <TableCell>Date de début</TableCell>
                  {tabValue === 'PFE' && <TableCell>Entreprise</TableCell>}
                  <TableCell>Technologies</TableCell>
                  <TableCell>Avancement</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEtudiants.map((etudiant) => (
                  <TableRow 
                    key={etudiant.id}
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'primary.light',
                        color: 'white',
                        '& .MuiTableCell-root': {
                          color: 'white',
                        },
                        '& .MuiTypography-root': {
                          color: 'white',
                        },
                      },
                      '& .MuiTableCell-root': {
                        py: 2,
                        borderColor: 'primary.light',
                      }
                    }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                        {etudiant.nom}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {etudiant.sujet}
                      </Typography>
                    </TableCell>
                    <TableCell>{etudiant.duree}</TableCell>
                    <TableCell>{new Date(etudiant.dateDebut).toLocaleDateString()}</TableCell>
                    {tabValue === 'PFE' && (
                      <TableCell>
                        <Chip 
                          label={etudiant.entreprise} 
                          size="small" 
                          sx={{ 
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: 'primary.dark',
                            }
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {etudiant.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{ 
                              bgcolor: 'primary.light',
                              color: 'white',
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem'
                              },
                              '&:hover': {
                                bgcolor: 'primary.main',
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 100 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={etudiant.avancement}
                              sx={{ 
                                height: 8, 
                                borderRadius: 5,
                                bgcolor: 'primary.light',
                                opacity: 0.3,
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 5,
                                  bgcolor: 'primary.main',
                                }
                              }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 500,
                                color: 'primary.main'
                              }}
                            >
                              {etudiant.avancement}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default PFEManagement;
