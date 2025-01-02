import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import PlanCredits from "./pages/MealPlans/PlanCredits";
import Customer from './pages/Customers/Customer'
import QRCode from './pages/QRCode/QRCode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan-credits" element={<PlanCredits />} />
        <Route path="/allCustomers" element={<Customer />} />
        <Route path="/qr-scanning" element={<QRCode />} />
      </Routes>
    </Router>
  );
}

export default App;
