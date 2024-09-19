import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ceinsysLogo from "../../images/Ceinsys.jpg";
import BackgroundImage from "../../images/BackgroundImage.png";
import Hello_sign from "../../images/wave.gif";
import AuthService from "../../Services/AuthService";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangeUsername = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const handleTogglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim().length === 0 && password.trim().length === 0) {
      toast.warning("Please Enter Credentials!");
    } else if (email.trim().length === 0) {
      toast.warning("Please Enter Username!");
    } else if (password.trim().length === 0) {
      toast.warning("Please Enter Password!");
    } else {
      try {
        AuthService.login(email, password).then(
          () => {
            const role = sessionStorage.getItem("Role");

            if (role === "SUPER_ADMIN") {
              navigate("/qmsLibrary");
            } else if (role === "ADMIN") {
              navigate("/aQmsLibrary");
            } else if (role === "USER") {
              navigate("/uQmsLibrary");
            } else {
              toast.error("Invalid Role!");
            }
          },
          (error) => {
            console.error("Login error:", error);
            toast.error("Invalid Credentials!");
          }
        );
      } catch (error) {
        toast.info("Unexpected Error!");
      }
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
    {/* Left side with background image */}
    <Grid 
      item 
      xs={false} 
      sm={7}
      md={8} 
      lg={9}
     xl={9}
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(100%)',
        height: '100%',
        position: 'relative',
        opacity:1
        
      }}
    > 
  </Grid>
  
    {/* Right side with login form */}
    <Grid 
      item 
      xs={12} 
      sm={5}
      md={4} 
      lg={3}
      xl={3}
     
      alignItems="center" 
      justifyContent="center" 
      sx={{ p: 5 }}
    >
      <Grid container>
        <Grid 
          item 
          xs={12} 
          sx={{ display: "flex", flexDirection: "column", justifyContent:"center"  }}
        >
          <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent:"center"  }}>
          <Grid item xl={1}>

</Grid>
<Grid item xl={10}>
<Box textAlign={"center"} mb={5}>
            <img
              src={ceinsysLogo}
              alt="Logo"
              style={{ width:'100%' }}
            />
          </Box>
</Grid>
<Grid item xl={1}>

</Grid>
        </Grid>
          
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
     
      <Typography variant="h4" component="h1" fontWeight="bold" color="#5da8e9">
        Welcome!!
      </Typography>
      <img
        alt="User"
        src={Hello_sign}
        style={{
          width: '48px', // Adjust the width as needed
          height: '48px', // Adjust the height as needed
          // marginLeft: '0px',
           // Space between image and text
        }}
      />
    </Box>
          <Typography variant="h5" component="h1" textAlign="center" fontWeight="bold" mb={5}>
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={onChangeUsername}
              autoFocus
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={onChangePassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",  }} marginTop={5}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#CDF0EA",
                  color: "black",
                  
                  "&:hover": {
                    backgroundColor: "#A4BCDB",
                    boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
            <ToastContainer />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  
  );
};

export default Login;
