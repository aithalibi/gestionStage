import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}

// Données de démonstration
const statsData = {
  totalStudents: 45,
  totalReports: 32,
  activeProjects: 28,
  completedProjects: 15,
};

const projectTypeData = [
  { name: 'PFE', value: 20 },
  { name: 'PFA', value: 15 },
  { name: 'Stages', value: 10 },
];

const monthlyReportsData = [
  { month: 'Jan', reports: 4 },
  { month: 'Fév', reports: 3 },
  { month: 'Mar', reports: 5 },
  { month: 'Avr', reports: 7 },
  { month: 'Mai', reports: 2 },
  { month: 'Juin', reports: 6 },
];

const COLORS = ['#2e7d32', '#4caf50', '#81c784'];

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <Card elevation={3}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tableau de Bord
      </Typography>

      {/* Cartes de statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Étudiants"
            value={statsData.totalStudents}
            icon={PeopleIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Rapports Reçus"
            value={statsData.totalReports}
            icon={AssignmentIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Projets Actifs"
            value={statsData.activeProjects}
            icon={SchoolIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Projets Terminés"
            value={statsData.completedProjects}
            icon={AssessmentIcon}
          />
        </Grid>
      </Grid>

      {/* Graphiques */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Rapports Mensuels
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReportsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reports" fill="#2e7d32" name="Rapports" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Distribution des Projets
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
