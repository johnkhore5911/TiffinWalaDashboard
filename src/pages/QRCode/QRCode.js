// import React from 'react';
// import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />
//       {/* Sidebar */}
//       <Drawer
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 240,
//             backgroundColor: '#1e1e1e', // Dark sidebar
//             color: '#fff',
//             border: 'none',
//           },
//         }}
//         variant="permanent"
//       >
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <Typography variant="h6" color="inherit">
//             Tiffin Wala
//           </Typography>
//         </div>
//         <List>
//           <ListItem button component={Link} to="/Dashboard" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button component={Link} to="/plan-credits" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Plan & Credits Management" />
//           </ListItem>
//           <ListItem button component={Link} to="/qr-scanning" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="QR Code Scanning" />
//           </ListItem>
//           <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Meal Opt-Out Notifications" />
//           </ListItem>
//           <ListItem button component={Link} to="/allCustomers" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="View Avaliable Customers" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={3}>
//             <Grid item xs={12}>

//               //code here okay ? chatgpt 
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper, TextField, FormControl, Select, MenuItem } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import QRCode from 'react-qr-code'; // Assuming you use a QR code library

// const Dashboard = () => {
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [validity, setValidity] = useState('1meal');
//   const [loading, setLoading] = useState(false);

//   // Function to generate the expiration date based on selected validity
//   const getValidDate = (validity) => {
//     const currentDate = new Date();
//     switch (validity) {
//       case '1meal':
//         currentDate.setHours(currentDate.getHours() + 2); // Example: Valid for the next 2 hours
//         break;
//       case '2meals':
//         currentDate.setHours(currentDate.getHours() + 4); // Example: Valid for the next 4 hours
//         break;
//       case 'fullDay':
//         currentDate.setHours(23, 59, 59, 999); // End of the current day
//         break;
//       case '1day':
//         currentDate.setDate(currentDate.getDate() + 1); // Valid for 1 day
//         currentDate.setHours(23, 59, 59, 999); // End of next day
//         break;
//       case '1week':
//         currentDate.setDate(currentDate.getDate() + 7); // Valid for 1 week
//         currentDate.setHours(23, 59, 59, 999); // End of the week
//         break;
//       default:
//         break;
//     }
//     return currentDate.toISOString(); // Format to ISO string
//   };

//   // Function to generate the QR code URL
//   const generateQRCode = async () => {
//     setLoading(true);

//     try {
//       // Get the token from local storage
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         alert('Token not found');
//         return;
//       }

//       const validDate = getValidDate(validity); // Get valid date based on selected validity
//       const requestBody = {
//         validDate, // Set the generated validDate based on the selected option
//       };

//       // Send POST request to generate QR code
//       const response = await axios.post('http://192.168.18.235:4000/api/qrCodeRoutes/generate', requestBody, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       // Assuming the response contains the QR code URL
//       if (response.data.success) {
//         setQrCodeUrl(response.data.qrCodeUrl); // Set the generated QR code URL
//         alert("QR code is actived Successfully!");
//       } else {
//         alert('Failed to generate QR code');
//       }
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       alert('An error occurred while generating the QR code.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />
//       {/* Sidebar */}
//       <Drawer
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 240,
//             backgroundColor: '#1e1e1e', // Dark sidebar
//             color: '#fff',
//             border: 'none',
//           },
//         }}
//         variant="permanent"
//       >
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <Typography variant="h6" color="inherit">
//             Tiffin Wala
//           </Typography>
//         </div>
//         <List>
//           <ListItem button component={Link} to="/Dashboard" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button component={Link} to="/plan-credits" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Plan & Credits Management" />
//           </ListItem>
//           <ListItem button component={Link} to="/qr-scanning" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="QR Code Scanning" />
//           </ListItem>
//           <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Meal Opt-Out Notifications" />
//           </ListItem>
//           <ListItem button component={Link} to="/allCustomers" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="View Available Customers" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Typography variant="h6" gutterBottom>
//                   Generate QR Code for Meal/Dining Session
//                 </Typography>

//                 <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                   <Typography>Select Validity:</Typography>
//                   <Select
//                     value={validity}
//                     onChange={(e) => setValidity(e.target.value)}
//                     fullWidth
//                   >
//                     <MenuItem value="1meal">Valid for One Meal</MenuItem>
//                     <MenuItem value="2meals">Valid for Two Meals</MenuItem>
//                     <MenuItem value="fullDay">Valid for Full Day</MenuItem>
//                     <MenuItem value="1day">Valid for 1 Day</MenuItem>
//                     <MenuItem value="1week">Valid for 1 Week</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <Button variant="contained" color="primary" onClick={generateQRCode} disabled={loading}>
//                   {loading ? 'Generating QR...' : 'Generate QR Code'}
//                 </Button>

//                 {qrCodeUrl && (
//                   <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     <Typography variant="body1" gutterBottom>
//                       QR Code Generated
//                     </Typography>
//                     <QRCode value={qrCodeUrl} size={256} />
//                     <Typography variant="body2" sx={{ marginTop: 2 }}>
//                       Scan this QR code during meal/dining session
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper, FormControl, Select, MenuItem } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import QRCode from 'react-qr-code'; // Assuming you use a QR code library

// const Dashboard = () => {
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [validity, setValidity] = useState('1meal');
//   const [loading, setLoading] = useState(false);

//   // Function to generate the expiration date based on selected validity
//   const getValidDate = (validity) => {
//     const currentDate = new Date();
//     switch (validity) {
//       case '1meal':
//         currentDate.setHours(currentDate.getHours() + 2); // Example: Valid for the next 2 hours
//         break;
//       case '2meals':
//         currentDate.setHours(currentDate.getHours() + 4); // Example: Valid for the next 4 hours
//         break;
//       case 'fullDay':
//         currentDate.setHours(23, 59, 59, 999); // End of the current day
//         break;
//       case '1day':
//         currentDate.setDate(currentDate.getDate() + 1); // Valid for 1 day
//         currentDate.setHours(23, 59, 59, 999); // End of next day
//         break;
//       case '1week':
//         currentDate.setDate(currentDate.getDate() + 7); // Valid for 1 week
//         currentDate.setHours(23, 59, 59, 999); // End of the week
//         break;
//       default:
//         break;
//     }
//     return currentDate.toISOString(); // Format to ISO string
//   };

//   // Function to generate the QR code URL
//   const generateQRCode = async () => {
//     setLoading(true);

//     try {
//       // Get the token from local storage
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         alert('Token not found');
//         return;
//       }

//       const validDate = getValidDate(validity); // Get valid date based on selected validity
//       const requestBody = {
//         validDate, // Set the generated validDate based on the selected option
//       };

//       // Send POST request to generate QR code
//       const response = await axios.post('http://192.168.18.235:4000/api/qrCodeRoutes/generate', requestBody, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       // Assuming the response contains the QR code URL
//       if (response.data.success) {
//         setQrCodeUrl(response.data.qrCodeUrl); // Set the generated QR code URL
//         alert("QR code is activated successfully!");
//       } else {
//         alert('Failed to generate QR code');
//       }
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       alert('An error occurred while generating the QR code.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />
//       {/* Sidebar */}
//       <Drawer
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 240,
//             backgroundColor: '#1e1e1e', // Dark sidebar
//             color: '#fff',
//             border: 'none',
//           },
//         }}
//         variant="permanent"
//       >
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <Typography variant="h6" color="inherit">
//             Tiffin Wala
//           </Typography>
//         </div>
//         <List>
//           <ListItem button component={Link} to="/Dashboard" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button component={Link} to="/plan-credits" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Plan & Credits Management" />
//           </ListItem>
//           <ListItem button component={Link} to="/qr-scanning" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="QR Code Scanning" />
//           </ListItem>
//           <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Meal Opt-Out Notifications" />
//           </ListItem>
//           <ListItem button component={Link} to="/allCustomers" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="View Available Customers" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Typography variant="h6" gutterBottom>
//                   Generate QR Code for Meal/Dining Session
//                 </Typography>

//                 <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                   <Typography>Select Validity:</Typography>
//                   <Select
//                     value={validity}
//                     onChange={(e) => setValidity(e.target.value)}
//                     fullWidth
//                   >
//                     <MenuItem value="1meal">Valid for One Meal</MenuItem>
//                     <MenuItem value="2meals">Valid for Two Meals</MenuItem>
//                     <MenuItem value="fullDay">Valid for Full Day</MenuItem>
//                     <MenuItem value="1day">Valid for 1 Day</MenuItem>
//                     <MenuItem value="1week">Valid for 1 Week</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <Button variant="contained" color="primary" onClick={generateQRCode} disabled={loading}>
//                   {loading ? 'Generating QR...' : 'Generate QR Code'}
//                 </Button>

//                 {qrCodeUrl && (
//                   <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     <Typography variant="body1" gutterBottom>
//                       QR Code Generated
//                     </Typography>
//                     <QRCode value={qrCodeUrl} size={256} />
//                     <Typography variant="body2" sx={{ marginTop: 2 }}>
//                       Scan this QR code during meal/dining session
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Button, Container, Grid, Paper, FormControl, Select, MenuItem, Card, CardContent, LinearProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import QRCode from 'react-qr-code'; // Assuming you use a QR code library

// const Dashboard = () => {
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [validity, setValidity] = useState('1meal');
//   const [loading, setLoading] = useState(false);
//   const [scannedUsers, setScannedUsers] = useState([]);
//   const [scanningLoading, setScanningLoading] = useState(false);

//   // Fetch scanned users data
//   const fetchScannedUsers = async () => {
//     setScanningLoading(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         alert('Token not found');
//         return;
//       }

//       const response = await axios.post(
//         'http://192.168.18.235:4000/api/qrCodeRoutes/getScannedCustomers',
//         { qrCode: 'http://192.168.18.235:4000/api/qrCodeRoutes/scan-qr' },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setScannedUsers(response.data.scannedUsers);
//       } else {
//         alert('Failed to fetch scanned users');
//       }
//     } catch (error) {
//       console.error('Error fetching scanned users:', error);
//       // alert('An error occurred while fetching scanned users.');
//     } finally {
//       setScanningLoading(false);
//     }
//   };

//   // Function to generate the expiration date based on selected validity
//   const getValidDate = (validity) => {
//     const currentDate = new Date();
//     switch (validity) {
//       case '1meal':
//         currentDate.setHours(currentDate.getHours() + 2); // Example: Valid for the next 2 hours
//         break;
//       case '2meals':
//         currentDate.setHours(currentDate.getHours() + 4); // Example: Valid for the next 4 hours
//         break;
//       case 'fullDay':
//         currentDate.setHours(23, 59, 59, 999); // End of the current day
//         break;
//       case '1day':
//         currentDate.setDate(currentDate.getDate() + 1); // Valid for 1 day
//         currentDate.setHours(23, 59, 59, 999); // End of next day
//         break;
//       case '1week':
//         currentDate.setDate(currentDate.getDate() + 7); // Valid for 1 week
//         currentDate.setHours(23, 59, 59, 999); // End of the week
//         break;
//       default:
//         break;
//     }
//     return currentDate.toISOString(); // Format to ISO string
//   };

//   // Function to generate the QR code URL
//   const generateQRCode = async () => {
//     setLoading(true);

//     try {
//       // Get the token from local storage
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         alert('Token not found');
//         return;
//       }

//       const validDate = getValidDate(validity); // Get valid date based on selected validity
//       const requestBody = {
//         validDate, // Set the generated validDate based on the selected option
//       };

//       // Send POST request to generate QR code
//       const response = await axios.post('http://192.168.18.235:4000/api/qrCodeRoutes/generate', requestBody, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       // Assuming the response contains the QR code URL
//       if (response.data.success) {
//         setQrCodeUrl(response.data.qrCodeUrl); // Set the generated QR code URL
//         alert("QR code is activated successfully!");
//       } else {
//         alert('Failed to generate QR code');
//       }
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       alert('An error occurred while generating the QR code.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchScannedUsers();
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />
//       {/* Sidebar */}
//       <Drawer
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 240,
//             backgroundColor: '#1e1e1e', // Dark sidebar
//             color: '#fff',
//             border: 'none',
//           },
//         }}
//         variant="permanent"
//       >
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <Typography variant="h6" color="inherit">
//             Tiffin Wala
//           </Typography>
//         </div>
//         <List>
//           <ListItem button component={Link} to="/Dashboard" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button component={Link} to="/plan-credits" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Plan & Credits Management" />
//           </ListItem>
//           <ListItem button component={Link} to="/qr-scanning" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="QR Code Scanning" />
//           </ListItem>
//           <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Meal Opt-Out Notifications" />
//           </ListItem>
//           <ListItem button component={Link} to="/allCustomers" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="View Available Customers" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={3}>
//             {/* QR Code Generation Section */}
//             <Grid item xs={12}>
//               <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Typography variant="h6" gutterBottom>
//                   Generate QR Code for Meal/Dining Session
//                 </Typography>

//                 <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                   <Typography>Select Validity:</Typography>
//                   <Select
//                     value={validity}
//                     onChange={(e) => setValidity(e.target.value)}
//                     fullWidth
//                   >
//                     <MenuItem value="1meal">Valid for One Meal</MenuItem>
//                     <MenuItem value="2meals">Valid for Two Meals</MenuItem>
//                     <MenuItem value="fullDay">Valid for Full Day</MenuItem>
//                     <MenuItem value="1day">Valid for 1 Day</MenuItem>
//                     <MenuItem value="1week">Valid for 1 Week</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <Button variant="contained" color="primary" onClick={generateQRCode} disabled={loading}>
//                   {loading ? 'Generating QR...' : 'Generate QR Code'}
//                 </Button>

//                 {qrCodeUrl && (
//                   <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     <Typography variant="body1" gutterBottom>
//                       QR Code Generated
//                     </Typography>
//                     <QRCode value={qrCodeUrl} size={256} />
//                     <Typography variant="body2" sx={{ marginTop: 2 }}>
//                       Scan this QR code during meal/dining session
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>

//             {/* Scanned Users Section */}
//             <Grid item xs={12}>
//               <Paper sx={{ padding: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Scanned Users
//                 </Typography>

//                 {scanningLoading ? (
//                   <LinearProgress />
//                 ) : (
//                   <Grid container spacing={3}>
//                     {scannedUsers.map((user, index) => (
//                       <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                           <CardContent>
//                             <Typography variant="h6">{user.user.name}</Typography>
//                             <Typography variant="body2" color="textSecondary">
//                               Email: {user.user.email}
//                             </Typography>
//                             <Typography variant="body2">
//                               Credits Used: {user.credits.usedCredits}
//                             </Typography>
//                             <Typography variant="body2">
//                               Credits Remaining: {user.credits.remainingCredits}
//                             </Typography>
//                             <Typography variant="body2">
//                               Meal Plan: {user.mealPlan}
//                             </Typography>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


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
        'http://192.168.18.235:4000/api/qrCodeRoutes/getScannedCustomers',
        { qrCode: 'http://192.168.18.235:4000/api/qrCodeRoutes/scan-qr' },
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
      const validDate = getValidDate(validity);
      const response = await axios.post(
        'http://192.168.18.235:4000/api/qrCodeRoutes/generate',
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
          <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Meal Opt-Out Notifications" />
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
