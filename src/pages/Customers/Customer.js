import React,{useState,useEffect} from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Customer = () => {
  
  const [customers, setCustomers] = useState([]);

  // Effect to fetch data periodically every 5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No authentication token found!","Login again!");
        return;
      }
        // Replace with your actual API endpoint
        const response = await axios.get('http://192.168.18.235:4000/api/userRoutes/getAllCustomers',{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCustomers(response.data);  // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  // Initial fetch when component mounts

    // Set interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);  // 5000ms = 5 seconds

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);  // Clear interval when the component unmounts
    };
  }, []);
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
            <th style={styles.th}>Used Credits</th>
            <th style={styles.th}>Available Credits</th>
            <th style={styles.th}>mealPlanName</th>
            <th style={styles.th}>mealPlanCredits</th>
            <th style={styles.th}>mealPlanExpiryDate</th>
            
          </tr>
        </thead>
        <tbody>
          {customers?.map((user, index) => (
            <tr
              key={user.email}
              style={index % 2 === 0 ? styles.rowEven : null}
            >
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.usedCredits}</td>
              <td
                style={{
                  ...styles.td,
                  ...(user.availableCredits < 5 ? styles.lowCredits : {}),
                }}
              >
                {user.availableCredits}
              </td>
              <td style={styles.td}>{user.mealPlanName}</td>
              <td style={styles.td}>{user.mealPlanCredits}</td>
              {/* <td style={styles.td}>{user.mealPlanExpiryDate}</td> */}
              <td style={styles.td}>
              {user?.mealPlanExpiryDate
                  ? new Date(user.mealPlanExpiryDate).toLocaleString() // Converts to local date and time
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

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
      // padding: "20px",
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