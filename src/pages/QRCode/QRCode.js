import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Grid,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';

const Dashboard = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [validity, setValidity] = useState('1meal');
  const [loading, setLoading] = useState(false);
  const [scannedUsers, setScannedUsers] = useState([]);
  const [scanningLoading, setScanningLoading] = useState(false);

  const fetchScannedUsers = async () => {
    setScanningLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Token not found');
        return;
      }
      const response = await axios.post(
        'https://tiffin-wala-backend.vercel.app/api/qrCodeRoutes/getScannedCustomers',
        { qrCode: 'https://tiffin-wala-backend.vercel.app/api/qrCodeRoutes/scan-qr' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setScannedUsers(response.data.scannedUsers);
      } else {
        alert('Failed to fetch scanned users');
      }
    } catch (error) {
      console.error('Error fetching scanned users:', error);
    } finally {
      setScanningLoading(false);
    }
  };

  const getValidDate = (validity) => {
    const currentDate = new Date();
    switch (validity) {
      case '1meal':
        currentDate.setHours(currentDate.getHours() + 2);
        break;
      case '2meals':
        currentDate.setHours(currentDate.getHours() + 4);
        break;
      case 'fullDay':
        currentDate.setHours(23, 59, 59, 999);
        break;
      case '1day':
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(23, 59, 59, 999);
        break;
      case '1week':
        currentDate.setDate(currentDate.getDate() + 7);
        currentDate.setHours(23, 59, 59, 999);
        break;
      default:
        break;
    }
    return currentDate.toISOString();
  };

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Token not found');
        return;
      }
      console.log("token: ",token);
      const validDate = getValidDate(validity);
      const response = await axios.post(
        'https://tiffin-wala-backend.vercel.app/api/qrCodeRoutes/generate',
        { validDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setQrCodeUrl(response.data.qrCodeUrl);
        alert('QR code activated successfully!');
      } else {
        alert('Failed to generate QR code');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('An error occurred while generating the QR code.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScannedUsers();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#1e1e1e',
            color: '#fff',
          },
        }}
        variant="permanent"
      >
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Tiffin Wala
        </Typography>
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
      <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', overflowY: 'auto' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h6">Generate QR Code</Typography>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <Select value={validity} onChange={(e) => setValidity(e.target.value)}>
                    <MenuItem value="1meal">Valid for One Meal</MenuItem>
                    <MenuItem value="2meals">Valid for Two Meals</MenuItem>
                    <MenuItem value="fullDay">Valid for Full Day</MenuItem>
                    <MenuItem value="1day">Valid for 1 Day</MenuItem>
                    <MenuItem value="1week">Valid for 1 Week</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={generateQRCode} disabled={loading}>
                  {loading ? 'Generating...' : 'Generate QR Code'}
                </Button>
                {qrCodeUrl && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <QRCode value={qrCodeUrl} size={256} />
                    <Typography variant="body2">Scan this QR code</Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h6">Scanned Users</Typography>
                {scanningLoading ? (
                  <LinearProgress />
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Used Credits</TableCell>
                          <TableCell>Remaining Credits</TableCell>
                          <TableCell>Meal Plan</TableCell>
                          <TableCell>Last Scanned (Local Time)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {scannedUsers.map((user, index) => (
                          <TableRow key={index}>
                            <TableCell>{user.user.name}</TableCell>
                            <TableCell>{user.user.email}</TableCell>
                            <TableCell>{user.credits.usedCredits}</TableCell>
                            <TableCell>{user.credits.remainingCredits}</TableCell>
                            <TableCell>{user.mealPlan}</TableCell>
                            <TableCell>
                              {new Date(user.credits.updatedAt).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
