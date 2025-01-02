import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Customer = () => {
    const userCredits = [
        {
          name: "John Doe",
          email: "john@example.com",
          availableCredits: 10,
          usedCredits: 20,
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          availableCredits: 3,
          usedCredits: 27,
        },
        {
          name: "Emily Davis",
          email: "emily@example.com",
          availableCredits: 15,
          usedCredits: 15,
        },
      ];
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
        

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>

            <div style={styles.container}>
      <h1 style={styles.heading}>User Credits Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Available Credits</th>
            <th style={styles.th}>Used Credits</th>
          </tr>
        </thead>
        <tbody>
          {userCredits.map((user, index) => (
            <tr
              key={user.email}
              style={index % 2 === 0 ? styles.rowEven : null}
            >
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td
                style={{
                  ...styles.td,
                  ...(user.availableCredits < 5 ? styles.lowCredits : {}),
                }}
              >
                {user.availableCredits}
              </td>
              <td style={styles.td}>{user.usedCredits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


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
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Customer;


const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "0 auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },
    th: {
      textAlign: "left",
      padding: "12px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "1px solid #ddd",
    },
    td: {
      textAlign: "left",
      padding: "12px",
      border: "1px solid #ddd",
    },
    rowEven: {
      backgroundColor: "#f2f2f2",
    },
    rowHover: {
      ":hover": {
        backgroundColor: "#ddd",
      },
    },
    lowCredits: {
      color: "red",
      fontWeight: "bold",
    },
  };