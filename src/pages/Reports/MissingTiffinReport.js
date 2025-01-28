import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [missedDeliveries, setMissedDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disabledRefunds, setDisabledRefunds] = useState({});

  useEffect(() => {
    const fetchMissedDeliveries = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Fetch token from localStorage
        const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/adminReportMissedTiffins', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setMissedDeliveries(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchMissedDeliveries();
  }, []);

  const handleRefund = async (id) => {
    console.log("id:: ",id);
    try {
      const token = localStorage.getItem('authToken'); // Fetch token from localStorage
      await axios.post(
        'https://tiffin-wala-backend.vercel.app/api/userRoutes/refundCredits', // Replace with the actual refund API endpoint
        { deliveryId:id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );

      setDisabledRefunds((prev) => ({ ...prev, [id]: true })); // Disable the button for this ID
      alert('Credits refunded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to refund credits!');
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

      <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Missing Tiffin Reports
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Customer Name</strong></TableCell>
                    <TableCell><strong>Customer Email</strong></TableCell>
                    <TableCell><strong>Delivery Person</strong></TableCell>
                    <TableCell><strong>Delivery Person Email</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Collection Status</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missedDeliveries.map((delivery) => (
                    <TableRow key={delivery._id}>
                      <TableCell>{delivery.customer.name}</TableCell>
                      <TableCell>{delivery.customer.email}</TableCell>
                      <TableCell>{delivery.deliveryPerson.name}</TableCell>
                      <TableCell>{delivery.deliveryPerson.email}</TableCell>
                      <TableCell>{delivery.status}</TableCell>
                      <TableCell>{delivery.collectionStatus}</TableCell>
                      <TableCell>{delivery.date}</TableCell>
                      <TableCell>
                        {delivery.status === 'Missed' &&  !delivery.isRefunded &&(
                          <Button
                            variant="contained"
                            color="secondary"
                            disabled={disabledRefunds[delivery._id]}
                            onClick={() => handleRefund(delivery._id)}
                          >
                            Refund Credits
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
