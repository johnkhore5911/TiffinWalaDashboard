import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar, 
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DeliveryAssignment = () => {
  const [customers, setCustomers] = useState([]);
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDeliveryUser, setSelectedDeliveryUser] = useState('');
  const [tempSelectedCustomers, setTempSelectedCustomers] = useState([]);
  const [customerDeliveryTime, setCustomerDeliveryTime] = useState('');
  const [deliveryData, setDeliveryData] = useState([]);


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const customerResponse = await axios.get(
        'https://tiffin-wala-backend.vercel.app/api/userRoutes/getTiffinSystemCustomers',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const deliveryResponse = await axios.get(
        'https://tiffin-wala-backend.vercel.app/api/userRoutes/getDeliveryUsers',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const deliveryDataResponse = await axios.get(
        'https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/getAllDeliveries',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("customerResponse: ",customerResponse.data);
      console.log("deliveryResponse: ",deliveryResponse.data);
      setCustomers(customerResponse.data.customers);
      setDeliveryUsers(deliveryResponse.data.data);
      setDeliveryData(deliveryDataResponse.data.deliveryPersons);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  useEffect(() => {
    // Fetch data on component mount and then every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // const handleAddCustomer = () => {
  //   if (
  //     selectedCustomer &&
  //     // !tempSelectedCustomers.some((c) => c.customerId === selectedCustomer) &&
  //     customerDeliveryTime
  //   ) 
  //   {
  //     const customer = customers.find((c) => c._id === selectedCustomer);
  //     if (customer && selectedDeliveryUser) {
  //       setTempSelectedCustomers((prev) => [
  //         ...prev,
  //         {
  //           customerId: selectedCustomer,
  //           customerName:customer.name,
  //           // deliveryFcmtoken:customer.fcmToken,
  //           customerFcmtoken:customer.fcmToken,
  //           deliveryFcmtoken:selectedDeliveryUser,
  //           deliveryPersonId: selectedDeliveryUser,
  //           status: 'Pending',
  //           date: customerDeliveryTime,
  //         },
  //       ]);
  //       setSelectedCustomer('');
  //       setCustomerDeliveryTime('');
  //     } else {
  //       alert('Please select a valid customer and delivery user.');
  //     }
  //   } else {
  //     alert('Please select a customer and delivery time.');
  //   }
  // };


  const handleAddCustomer = () => {
    if (
      selectedCustomer &&
      customerDeliveryTime
    ) {
      const customer = customers.find((c) => c._id === selectedCustomer);
      const deliveryUser = deliveryUsers.find((user) => user._id === selectedDeliveryUser);
  
      if (customer && deliveryUser) {
        setTempSelectedCustomers((prev) => [
          ...prev,
          {
            customerId: selectedCustomer,
            customerName: customer.name,
            customerFcmtoken: customer.fcmToken,
            deliveryPersonId: selectedDeliveryUser,
            deliveryName: deliveryUser.name,
            deliveryFcmtoken: deliveryUser.fcmToken, // Include delivery FCM token
            status: 'Pending',
            date: customerDeliveryTime,
          },
        ]);
        setSelectedCustomer('');
        setCustomerDeliveryTime('');
      } else {
        alert('Please select a valid customer and delivery user.');
      }
    } else {
      alert('Please select a customer and delivery time.');
    }
  };

  
  const handleRemoveCustomer = (customerId) => {
    setTempSelectedCustomers((prev) =>
      prev.filter((c) => c.customerId !== customerId)
    );
  };

  const handleAssign = async () => {
    if (!selectedDeliveryUser || tempSelectedCustomers.length === 0) {
      alert('Please select a delivery user and at least one customer.');
      return;
    }
    console.log("23: ",tempSelectedCustomers);

    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/assignMultiple',
        tempSelectedCustomers,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
      alert('Delivery assignment successful!');
      setTempSelectedCustomers([]);
    } catch (error) {
      console.error('Error assigning delivery:', error);
      alert('Failed to assign delivery. Please try again.');
    }
  };

  const handleDelete = async (deliveryPersonId, customerId) => {
    console.log("deliveryPersonId: ",deliveryPersonId);
    console.log("customerId: ",customerId);
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(
        `https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/delete/${deliveryPersonId}/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Delivery deleted successfully.');
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting delivery:', error);
      alert('Failed to delete delivery. Please try again.');
    }
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

      <Container>
          <Typography variant="h4" gutterBottom>
            Delivery Assignment
          </Typography>
          
          <Paper sx={{ p: 3, mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
              {/* Select Customer */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="customer-select-label">Select Customer</InputLabel>
                  <Select
                    labelId="customer-select-label"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer._id} value={customer._id}>
                        {customer.name} ({customer.address})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Delivery Time */}
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Time"
                  type="time"
                  value={customerDeliveryTime}
                  onChange={(e) => setCustomerDeliveryTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>

              {/* Select Delivery User */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="delivery-user-select-label">Select Delivery User</InputLabel>
                  <Select
                    labelId="delivery-user-select-label"
                    value={selectedDeliveryUser}
                    onChange={(e) => setSelectedDeliveryUser(e.target.value)}
                  >
                    {deliveryUsers.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.name} ({user.address})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Add Customer Button */}
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddCustomer}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {/* Selected Customers */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Selected Customers:</Typography>
              {tempSelectedCustomers.length === 0 ? (
                <Typography>No customers selected.</Typography>
              ) : (
                tempSelectedCustomers.map((customer) => (
                  <Chip
                    key={customer.customerId}
                    label={`Customer: ${customer.customerName} | Time: ${customer.date}`}
                    onDelete={() => handleRemoveCustomer(customer.customerId)}
                    sx={{ margin: '5px' }}
                  />
                ))
              )}
            </Box>

            {/* Assign Button */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 4 }}
              onClick={handleAssign}
            >
              Assign Deliveries
            </Button>
          </Paper>

          {deliveryData.map(({ deliveryPerson, deliveries }) => (
            <Box key={deliveryPerson._id} sx={{ my: 3 }}>
              <Typography variant="h6" gutterBottom>
                Delivery Person: {deliveryPerson.name} ({deliveryPerson.email})
              </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Collection Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Feedback</TableCell>
                        <TableCell>Action</TableCell> {/* New column for delete */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deliveries.length > 0 ? (
                        deliveries.map((delivery, index) => (
                          <TableRow key={index}>
                            <TableCell>{delivery.customer.name}</TableCell>
                            <TableCell>{delivery.customer.email}</TableCell>
                            <TableCell>{delivery.status}</TableCell>
                            <TableCell>{delivery.collectionStatus}</TableCell>
                            <TableCell>{delivery.date}</TableCell>
                            <TableCell>{delivery.feedback}</TableCell>
                            <TableCell>
                              {/* Delete button */}
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() =>
                                  handleDelete(deliveryPerson._id, delivery.customer._id)
                                }
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            No deliveries assigned.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

            </Box>
          ))}
        </Container>
    </Box>
  </Box>
  );
};

export default DeliveryAssignment;
