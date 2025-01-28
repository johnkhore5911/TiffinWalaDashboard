import React, { useState, useEffect } from 'react';
import { CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemText, Container, Paper, Box, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const OptOut = () => {
  const [optOutReports, setOptOutReports] = useState([]);
  const token = localStorage.getItem('authToken'); // Get the auth token from localStorage

  useEffect(() => {
    // Fetch opt-out reports when the component is mounted
    axios
      .get('https://tiffin-wala-backend.vercel.app/api/userRoutes/getOptOutReports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOptOutReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching opt-out reports:', error);
      });
  }, [token]);

  // Function to handle deletion of an opt-out record by ID
  const handleDelete = (id) => {
    axios
      .post(
        'https://tiffin-wala-backend.vercel.app/api/userRoutes/deleteOptOutById',
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted report from the state
          setOptOutReports(optOutReports.filter((report) => report._id !== id));
          alert('Opt-out record deleted successfully');
        }
      })
      .catch((error) => {
        console.error('Error deleting opt-out record:', error);
      });
  };

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
            backgroundColor: '#1e1e1e',
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
          <ListItem button component={Link} to="/DeliveryAssignment" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Delivery Assignment" />
          </ListItem>
          <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Meal Opt-Out Notifications" />
          </ListItem>
          <ListItem button component={Link} to="/MissingTiffinStatus" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Missing Tiffin Reports" />
          </ListItem>
          <ListItem button component={Link} to="/allCustomers" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="View Avaliable Customers" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Meal Opt-Out Notifications
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Date and Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {optOutReports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell>{report.customer.name}</TableCell>
                    <TableCell>{report.customer.email}</TableCell>
                    <TableCell>{report.customer.contact}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(report._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default OptOut;
