import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Edit as EditIcon
} from '@mui/icons-material';

// Mock data - À remplacer par les vraies données de l'enseignant
const teacherData = {
  id: 1,
  name: "mme. hajar sitti",
  title: "Professeur d'Informatique",
  email: "hajar.sitti@emsi-edu.ma",
  phone: "+212 7754059865",
  department: "Département Informatique",
  specialization: "Intelligence Artificielle & Développement Web",
  avatar: "", // URL de l'avatar
  education: [
    {
      degree: "Doctorat en Informatique",
      institution: "École Mohammadia d'Ingénieurs",
      year: "2015"
    },
    {
      degree: "Master en Génie Logiciel",
      institution: "ENSIAS",
      year: "2010"
    }
  ],
  expertise: [
    "Intelligence Artificielle",
    "Machine Learning",
    "Développement Web",
    "Base de Données",
    "Cloud Computing"
  ],
  currentProjects: [
    {
      title: "Système de Gestion des Stages",
      role: "Superviseur Principal",
      students: 3
    },
    {
      title: "IA pour la Détection d'Objets",
      role: "Co-superviseur",
      students: 2
    }
  ]
};

const TeacherProfile = () => {
  return (
    <Box sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 8,
      px: 3,
      pb: 3,
      bgcolor: '#f5f5f5'
    }}>
      <Container maxWidth="lg">
        {/* En-tête du profil */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 4,
            mb: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            sx={{ 
              position: 'absolute',
              top: 20,
              right: 20
            }}
          >
            Modifier
          </Button>
          
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: { xs: 2, sm: 0 },
              mr: { sm: 4 },
              bgcolor: 'primary.main'
            }}
          >
            {teacherData.name.charAt(0)}
          </Avatar>
          
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {teacherData.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {teacherData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {teacherData.department}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Chip icon={<EmailIcon />} label={teacherData.email} />
              <Chip icon={<PhoneIcon />} label={teacherData.phone} />
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Expertise */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  <SchoolIcon />
                  Domaines d'expertise
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                  {teacherData.expertise.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.main' }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Formation */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  Formation
                </Typography>
                <List>
                  {teacherData.education.map((edu, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={edu.degree}
                          secondary={
                            <>
                              <Typography component="span" variant="body2">
                                {edu.institution}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2" color="primary">
                                {edu.year}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < teacherData.education.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Projets en cours */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  Projets en cours
                </Typography>
                <Grid container spacing={2}>
                  {teacherData.currentProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: 'background.default',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {project.role}
                        </Typography>
                        <Chip
                          label={`${project.students} étudiants`}
                          size="small"
                          sx={{ bgcolor: 'primary.light', color: 'white' }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherProfile;
