import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Typography,ListItemText, List, ListItem, TextField, Button, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DailyMenuNotifications = () => {
  const [menu, setMenu] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');

  const handleSendNotification = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No authentication token found! Login again!");
        return;
      }
      console.log("")

      // Replace with your backend API endpoint
      const response = await axios.post(
        'https://tiffin-wala-backend3.vercel.app/send-meal-notification',
        { message:menu },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setNotificationStatus(response.data.message || 'Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      setNotificationStatus('Failed to send notification. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#1e1e1e',
            color: '#fff',
          },
        }}
        variant="permanent"
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6" color="inherit">
            Admin Panel
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Daily Menu Notifications
          </Typography>
          <Paper sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Daily Menu"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendNotification}
              sx={{ mt: 2 }}
            >
              Send Notification
            </Button>
            {notificationStatus && (
              <Typography variant="body1" color="secondary" sx={{ mt: 2 }}>
                {notificationStatus}
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default DailyMenuNotifications;
