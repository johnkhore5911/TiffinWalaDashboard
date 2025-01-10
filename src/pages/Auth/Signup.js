// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Box,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { styled } from "@mui/system";

// const Background = styled(Box)(({ theme }) => ({
//   backgroundColor: "#f0f8ff", // Light blue background
//   height: "100vh",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   maxWidth: 600,
//   width: "100%",
//   borderRadius: "16px",
//   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//   backgroundColor: "#ffffff",
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   marginTop: "1.5rem",
//   backgroundColor: "#0078D7", // VS Code blue
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#005a9e",
//   },
// }));

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [fname,setFname] = useState('');
//   const [lname,setLname] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     console.log("Email: ",email);
//     // Validation
//     if (!email || !password || !confirmPassword) {
//       alert("Please fill in all fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       // Replace with your API endpoint
//       const response = await axios.post("http://192.168.18.235:4000/api/auth/signup", {
//         email,
//         password,
//         confirmPassword,
//         role:"admin",
//         firstName:fname,
//         lastName:lname,
//       });

//       if (response.status === 200) {
//         alert("Signup successful! Redirecting to login...");
//         navigate("/"); // Redirect to login page
//       } else {
//         alert("Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       alert(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <Background>
//       <StyledCard>
//         <CardContent>
//           <Typography
//             variant="h4"
//             gutterBottom
//             align="center"
//             style={{
//               fontWeight: 700,
//               color: "#0078D7",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Create Your Account
//           </Typography>
//           <Typography
//             variant="body1"
//             align="center"
//             style={{
//               color: "#6c757d",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Join us and get started!
//           </Typography>
//           <TextField
//             label="First Name"
//             type="text"
//             fullWidth
//             margin="normal"
//             value={fname}
//             onChange={(e) => setFname(e.target.value)}
//             variant="outlined"
//           />
//           <TextField
//             label="Last Name"
//             type="text"
//             fullWidth
//             margin="normal"
//             value={lname}
//             onChange={(e) => setLname(e.target.value)}
//             variant="outlined"
//           />
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             variant="outlined"
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             variant="outlined"
//           />
//           <TextField
//             label="Confirm Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             variant="outlined"
//           />
//           <StyledButton
//             variant="contained"
//             fullWidth
//             onClick={handleSignup}
//           >
//             Signup
//           </StyledButton>
//           <Typography
//             variant="body2"
//             align="center"
//             style={{
//               marginTop: "1rem",
//               cursor: "pointer",
//               color: "#0078D7",
//             }}
//             onClick={() => navigate("/")}
//           >
//             Already have an account? Login
//           </Typography>
//         </CardContent>
//       </StyledCard>
//     </Background>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: "#f0f8ff", // Light blue background
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  width: "100%",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "1.5rem",
  backgroundColor: "#0078D7", // VS Code blue
  color: "#fff",
  "&:hover": {
    backgroundColor: "#005a9e",
  },
}));

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("Email: ", email);

    // Validation
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Replace with your API endpoint
      const response = await axios.post("https://tiffin-wala-backend.vercel.app/api/auth/signup", {
        email,
        password,
        confirmPassword,
        role: "admin",
        firstName: fname,
        lastName: lname,
        secretkey:secretKey
      });

      if (response.status === 200) {
        toast.success("Signup successful! Redirecting to login...");
        navigate("/"); // Redirect to login page
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Background>
      <StyledCard>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            style={{
              fontWeight: 700,
              color: "#0078D7",
              marginBottom: "1.5rem",
            }}
          >
            Create Your Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{
              color: "#6c757d",
              marginBottom: "1.5rem",
            }}
          >
            Join us and get started!
          </Typography>
          <TextField
            label="First Name"
            type="text"
            fullWidth
            margin="normal"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Last Name"
            type="text"
            fullWidth
            margin="normal"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Secret Key"
            type="password"
            fullWidth
            margin="normal"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            variant="outlined"
          />
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleSignup}
          >
            Signup
          </StyledButton>
          <Typography
            variant="body2"
            align="center"
            style={{
              marginTop: "1rem",
              cursor: "pointer",
              color: "#0078D7",
            }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </Typography>
        </CardContent>
      </StyledCard>

      {/* Toast container to display the notifications */}
      <ToastContainer />
    </Background>
  );
}

export default Signup;
