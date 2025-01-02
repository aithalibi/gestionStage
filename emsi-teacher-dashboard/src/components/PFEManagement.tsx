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
  Container,
  Avatar
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
    <Box sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 8, 
      px: 3, 
      pb: 3, 
    }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        {/* En-tête */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 1,
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}>
            <SchoolIcon sx={{ fontSize: 35 }} />
            Gestion des Stages
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Tableau de bord de suivi des stages {tabValue}
          </Typography>
        </Box>

        {/* Cartes de statistiques */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                width: 56, 
                height: 56,
                mr: 2
              }}>
                <GroupIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {stats.total}
                </Typography>
                <Typography sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
                  Étudiants en {tabValue}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              background: 'linear-gradient(45deg, #2E7D32 30%, #388E3C 90%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                width: 56, 
                height: 56,
                mr: 2
              }}>
                <TimelineIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {stats.avancementMoyen}%
                </Typography>
                <Typography sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
                  Avancement moyen
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                width: 56, 
                height: 56,
                mr: 2
              }}>
                <SchoolIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {stats.enCours}
                </Typography>
                <Typography sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
                  Stages en cours
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Section principale */}
        <Card sx={{ 
          borderRadius: 2, 
          boxShadow: 1,
          mb: 4
        }}>
          {/* Onglets */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'primary.main',
            borderRadius: '8px 8px 0 0',
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                '& .MuiTab-root': { 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  minHeight: 56,
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

          <Box sx={{ p: 4 }}>
            {/* Barre de recherche */}
            <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
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
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '& fieldset': {
                      borderWidth: 2,
                    }
                  },
                }}
              />
            </Box>

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
                      color: 'white',
                      px: 2,
                      py: 2,
                      whiteSpace: 'nowrap'
                    }
                  }}>
                    <TableCell width="20%">Étudiant</TableCell>
                    <TableCell width="30%">Sujet</TableCell>
                    <TableCell width="10%">Durée</TableCell>
                    <TableCell width="15%">Date de début</TableCell>
                    {tabValue === 'PFE' && <TableCell width="10%">Entreprise</TableCell>}
                    <TableCell width="20%">Technologies</TableCell>
                    <TableCell width="15%">Avancement</TableCell>
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
                          px: 2,
                          py: 2.5,
                          borderColor: 'primary.light',
                          whiteSpace: 'normal',
                          verticalAlign: 'top'
                        }
                      }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                          {etudiant.nom}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
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
        </Card>
      </Container>
    </Box>
  );
};

export default PFEManagement;
