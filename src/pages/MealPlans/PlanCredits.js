// import { CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemText, Container, Paper, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid } from '@mui/material';
// import axios from 'axios';

// const Dashboard = () => {
//   const [mealPlan, setMealPlan] = useState({
//     name: '',
//     description: '',
//     credits: '',
//     price: '',
//     validity: '',
//     planType: '',
//   });

//   const [mealPlans, setMealPlans] = useState([]);

//   // Sample hardcoded data for meal plans
//   const sampleMealPlans = [
//     {
//       name: "Standard Daily Plan",
//       description: "A balanced meal plan for everyday use. Includes breakfast, lunch, and dinner.",
//       credits: 30,
//       price: 150,
//       validity: 30,
//       planType: "Daily",
//     },
//     {
//       name: "Weekly Special Plan",
//       description: "A weekly plan that offers a variety of meals for the whole week.",
//       credits: 210,
//       price: 900,
//       validity: 7,
//       planType: "Weekly",
//     },
//   ];

//   // Fetching meal plans (using sample data for now)
//   useEffect(() => {
//     setMealPlans(sampleMealPlans);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMealPlan({
//       ...mealPlan,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("mealPlan: ", mealPlan);

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.post('http://192.168.18.235:4000/api/mealPlanRoutes/meal-plans', mealPlan,{
//         headers:{
//             'Authorization':`Bearer ${token}`
//         }
//       });
//       alert('Meal Plan Created Successfully');
//       // Optionally, reset form or handle success state
//     } catch (error) {
//       console.error('Error creating meal plan:', error);
//       alert('Failed to create meal plan');
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
//             backgroundColor: '#1e1e1e',
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
//           <ListItem button component={Link} to="/plan-credits" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Plan & Credits Management" />
//           </ListItem>
//           <ListItem button component={Link} to="/qr-scanning" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="QR Code Scanning" />
//           </ListItem>
//           <ListItem button component={Link} to="/meal-opt-out" sx={{ color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
//             <ListItemText primary="Meal Opt-Out Notifications" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f4f4f4', height: '100vh', overflowY: 'auto' }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={3}>
//             {/* Meal Plan Form */}
//             <Grid item xs={12}>
//               <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
//                   <Card sx={{ width: '100%', maxWidth: 600, padding: 3, boxShadow: 3 }}>
//                     <CardContent>
//                       <Typography variant="h5" gutterBottom>
//                         Add New Meal Plan
//                       </Typography>
//                       <form onSubmit={handleSubmit}>
//                         <Grid container spacing={3}>
//                           <Grid item xs={12}>
//                             <TextField
//                               label="Meal Plan Name"
//                               name="name"
//                               value={mealPlan.name}
//                               onChange={handleInputChange}
//                               fullWidth
//                               required
//                               variant="outlined"
//                             />
//                           </Grid>
//                           <Grid item xs={12}>
//                             <TextField
//                               label="Description"
//                               name="description"
//                               value={mealPlan.description}
//                               onChange={handleInputChange}
//                               fullWidth
//                               required
//                               variant="outlined"
//                               multiline
//                               rows={3}
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={6}>
//                             <TextField
//                               label="Credits"
//                               name="credits"
//                               value={mealPlan.credits}
//                               onChange={handleInputChange}
//                               fullWidth
//                               required
//                               type="number"
//                               variant="outlined"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={6}>
//                             <TextField
//                               label="Price"
//                               name="price"
//                               value={mealPlan.price}
//                               onChange={handleInputChange}
//                               fullWidth
//                               required
//                               type="number"
//                               variant="outlined"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={6}>
//                             <TextField
//                               label="Validity (in Days)"
//                               name="validity"
//                               value={mealPlan.validity}
//                               onChange={handleInputChange}
//                               fullWidth
//                               required
//                               type="number"
//                               variant="outlined"
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={6}>
//                             <FormControl fullWidth>
//                               <InputLabel>Meal Plan Type</InputLabel>
//                               <Select
//                                 name="planType"
//                                 value={mealPlan.planType}
//                                 onChange={handleInputChange}
//                                 required
//                                 label="Meal Plan Type"
//                               >
//                                 <MenuItem value="daily">Daily</MenuItem>
//                                 <MenuItem value="weekly">Weekly</MenuItem>
//                                 <MenuItem value="monthly">Monthly</MenuItem>
//                               </Select>
//                             </FormControl>
//                           </Grid>
//                           <Grid item xs={12}>
//                             <Button
//                               type="submit"
//                               fullWidth
//                               variant="contained"
//                               color="primary"
//                               sx={{ padding: '12px', fontSize: '16px' }}
//                             >
//                               Save Meal Plan
//                             </Button>
//                           </Grid>
//                         </Grid>
//                       </form>
//                     </CardContent>
//                   </Card>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Display Previous Meal Plans */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Previous Meal Plans
//               </Typography>
//               {mealPlans.length === 0 ? (
//                 <Typography>No meal plans available.</Typography>
//               ) : (
//                 mealPlans.map((plan, index) => (
//                   <Paper key={index} sx={{ padding: 2, marginBottom: 2, boxShadow: 2, borderRadius: 2 }}>
//                     <Typography variant="h6">{plan.name}</Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {plan.description}
//                     </Typography>
//                     <Typography variant="body2" color="textPrimary">
//                       Credits: {plan.credits} | Price: {plan.price} | Validity: {plan.validity} days | Type: {plan.planType}
//                     </Typography>
//                   </Paper>
//                 ))
//               )}
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import { CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemText, Container, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid,IconButton  } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const [mealPlan, setMealPlan] = useState({
    name: '',
    description: '',
    credits: '',
    price: '',
    validity: '',
    planType: '',
  });

  const [mealPlans, setMealPlans] = useState([]);

  const fetchMealPlans = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No authentication token found!");
        return;
      }

      const response = await axios.get('http://192.168.18.235:4000/api/mealPlanRoutes/meal-plans', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update state with fetched meal plans
      if (response.data.success) {
        setMealPlans(response.data.data);
        // fetchMealPlans();
      } else {
        setMealPlans([]);
      }
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      setMealPlans([]);
    }
  };

  // Fetching meal plans from the API
  useEffect(() => {
    fetchMealPlans();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealPlan({
      ...mealPlan,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("mealPlan: ", mealPlan);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post('http://192.168.18.235:4000/api/mealPlanRoutes/meal-plans', mealPlan, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchMealPlans();
      alert('Meal Plan Created Successfully');
    } catch (error) {
      console.error('Error creating meal plan:', error);
      alert('Failed to create meal plan');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No authentication token found!");
      return;
    }

    try {
      const response = await axios.delete(`http://192.168.18.235:4000/api/mealPlanRoutes/meal-plans/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchMealPlans(); // Refresh the meal plans after deletion
        alert('Meal Plan Deleted Successfully');
      } else {
        alert('Failed to delete meal plan');
      }
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      alert('Failed to delete meal plan');
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
            {/* Meal Plan Form */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                  <Card sx={{ width: '100%', maxWidth: 600, padding: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Add New Meal Plan
                      </Typography>
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              label="Meal Plan Name"
                              name="name"
                              value={mealPlan.name}
                              onChange={handleInputChange}
                              fullWidth
                              required
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Description"
                              name="description"
                              value={mealPlan.description}
                              onChange={handleInputChange}
                              fullWidth
                              required
                              variant="outlined"
                              multiline
                              rows={3}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Credits"
                              name="credits"
                              value={mealPlan.credits}
                              onChange={handleInputChange}
                              fullWidth
                              required
                              type="number"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Price"
                              name="price"
                              value={mealPlan.price}
                              onChange={handleInputChange}
                              fullWidth
                              required
                              type="number"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Validity (in Days)"
                              name="validity"
                              value={mealPlan.validity}
                              onChange={handleInputChange}
                              fullWidth
                              required
                              type="number"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel>Meal Plan Type</InputLabel>
                              <Select
                                name="planType"
                                value={mealPlan.planType}
                                onChange={handleInputChange}
                                required
                                label="Meal Plan Type"
                              >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              sx={{ padding: '12px', fontSize: '16px' }}
                            >
                              Save Meal Plan
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </CardContent>
                  </Card>
                </Box>
              </Paper>
            </Grid>

            {/* Display Previous Meal Plans */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Previous Meal Plans
              </Typography>
              {mealPlans.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No meal plans available.
        </Typography>
      ) : (
        mealPlans.map((plan, index) => (
          <Paper
            key={index}
            sx={{
              padding: 3,
              marginBottom: 2,
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Meal Plan Details */}
              <Grid item xs={10}>
                <Typography variant="h6" color="textPrimary">
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {plan.description}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Credits:</strong> {plan.credits} |{" "}
                  <strong>Price:</strong> ₹{plan.price} |{" "}
                  <strong>Validity:</strong> {plan.validity} days |{" "}
                  <strong>Type:</strong> {plan.planType}
                </Typography>
              </Grid>

              {/* Delete Button */}
              <Grid item xs={2}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(plan._id)}
                    sx={{ backgroundColor: "#fdecea", "&:hover": { backgroundColor: "#f8d7da" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
