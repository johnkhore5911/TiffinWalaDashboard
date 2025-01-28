// import React, { useState } from "react";
// import axios from "axios"; // Import Axios
// import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Typography,
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

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (email && password) {
//       try {
//         const response = await axios.post("http://192.168.18.235:4000/api/auth/login", {
//           email,
//           password,
//         });
//         if (response.data.success) {
//           // Assuming 'success' is returned when login is successful
//           alert("Login successful!");
//           navigate("/dashboard");
//         } else {
//           alert("Invalid credentials. Please try again.");
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         alert("An error occurred during login. Please try again.");
//       }
//     } else {
//       alert("Please enter valid credentials");
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
//             Welcome to Tiffin Wala
//           </Typography>
//           <Typography
//             variant="body1"
//             align="center"
//             style={{
//               color: "#6c757d",
//               marginBottom: "1.5rem",
//             }}
//           >
//             Please login to continue
//           </Typography>
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
//           <StyledButton
//             variant="contained"
//             fullWidth
//             onClick={handleLogin}
//           >
//             Login
//           </StyledButton>
//           <Typography
//             variant="body2"
//             align="center"
//             style={{
//               marginTop: "1rem",
//               cursor: "pointer",
//               color: "#0078D7",
//             }}
//             onClick={() => navigate("/signup")}
//           >
//             Don't have an account? Signup
//           </Typography>
//         </CardContent>
//       </StyledCard>
//     </Background>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";  // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";  // Import the required styles

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post("https://tiffin-wala-backend.vercel.app/api/auth/login", {
          email,
          password,
          fcmToken:"12345"
        });
        console.log("Reponse: ",response.data);
        localStorage.setItem("authToken", response.data.token);

        if (response.data.success) {
          toast.success("Login successful!");  // Show success toast
          navigate("/dashboard");
        } else {
          toast.error("Invalid credentials. Please try again.");  // Show error toast
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login. Please try again.");
      }
    } else {
      toast.warning("Please enter valid credentials");  // Show warning toast
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
            Welcome to Tiffin Wala
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{
              color: "#6c757d",
              marginBottom: "1.5rem",
            }}
          >
            Please login to continue
          </Typography>
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
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </StyledButton>
          <Typography
            variant="body2"
            align="center"
            style={{
              marginTop: "1rem",
              cursor: "pointer",
              color: "#0078D7",
            }}
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Signup
          </Typography>
        </CardContent>
      </StyledCard>

      {/* Add ToastContainer here to display toast notifications */}
      <ToastContainer />
    </Background>
  );
}

export default Login;
