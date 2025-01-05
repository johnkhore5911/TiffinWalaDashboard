import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#1e1e1e', // Dark sidebar
            color: '#fff',
            border: 'none',
          },
        }}
        variant="permanent"
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6" color="inherit">
            Tiffin Wala
          </Typography>
        </div>
        <List>
          <ListItem button component={Link} to="/Dashboard" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/DailyMenuNotifications" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Daily Menu" />
          </ListItem>
          <ListItem button component={Link} to="/plan-credits" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Plan & Credits Management" />
          </ListItem>
          <ListItem button component={Link} to="/qr-scanning" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="QR Code Scanning" />
          </ListItem>
          <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Meal Opt-Out Notifications" />
          </ListItem>
          <ListItem button component={Link} to="/allCustomers" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="View Avaliable Customers" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
        <AppBar position="sticky" sx={{ background: '#333' }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Welcome to the Admin Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Manage meal plans, credits, QR codes, and customer notifications from this central hub.
                </Typography>
                {/* <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1e88e5',
                    color: '#fff',
                    width: '100%',
                    padding: '15px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    marginBottom: '20px',
                  }}
                  component={Link}
                  to="/plan-credits"
                >
                  Go to Plan & Credits Management
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1e88e5',
                    color: '#fff',
                    width: '100%',
                    padding: '15px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    marginBottom: '20px',
                  }}
                  component={Link}
                  to="/qr-scanning"
                >
                  Go to QR Code Scanning
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1e88e5',
                    color: '#fff',
                    width: '100%',
                    padding: '15px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    marginBottom: '20px',
                  }}
                  component={Link}
                  to="/meal-opt-out"
                >
                  Go to Meal Opt-Out Notifications
                </Button> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
