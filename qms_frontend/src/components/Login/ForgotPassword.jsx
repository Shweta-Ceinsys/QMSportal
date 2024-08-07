import React, { useState,useContext } from 'react';
import './Login.css';
// import { ColorModeContext, tokens,themeSettings } from "../../theme";
import {  Button, Typography, Box, Modal, TextField,Link,useTheme,IconButton, InputAdornment, Alert, Grid} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ceinsysLogo from "../../images/Ceinsys.jpg"
import AuthService from '../../Services/AuthService';
import superadmin from '../../Services/superadmin';





const ForgotPassword = () => {


  let navigate = useNavigate();

  
  
  


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [params, setParams] = useState({
    
    email:"",
    password:"",
   
    
  });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setParams((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//    try{
//     if (params.email.trim().length === 0 && params.password.trim().length === 0) {
//       toast.warning('Please Enter Credentials !');
//     } else if (params.email.trim().length === 0 ) {
//       toast.warning('Please Enter Username!');
//     } else if (params.password.trim().length === 0) {
//       toast.warning('Please Enter Password!');
//     }else {
//         const response = superadmin.forgetPassword(params);
//      toast.success('Password changed Successfuly');
//      navigate("/login")
   
// }}catch (error) {
//     console.error("Error adding user:", error);
//     toast.error("Failed to change password!");
//   }
    
    
//   };
  const handleSubmit = (event) => {
    event.preventDefault();
   try{
    if (email.trim().length === 0 && password.trim().length === 0) {
      toast.warning('Please Enter Credentials !');
    } else if (email.trim().length === 0 ) {
      toast.warning('Please Enter Username!');
    } else if (password.trim().length === 0) {
      toast.warning('Please Enter Password!');
    }else {
        const response = AuthService.forgetPassword(email,password);
     toast.success('Password changed Successfuly');
     navigate("/login")
   
}}catch (error) {
    console.error("Error adding user:", error);
    toast.error("Failed to change password!");
  }
    
    
  };
  return (
   
    <div  className="app" style={{ backgroundColor: '#F6F5F2', width: '100vw', height: '100vh' }}>
    <Grid container spacing={0} sx={{ height: '100%' }}>
      <Grid item xs={false} md={7} lg={8} xl={8} />
      <Grid item xs={12} md={5} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            bgcolor: 'white',
            // border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            width: '100%',
            maxWidth: 400,
            position: 'relative',
            // Center the form in the middle of the page on mobile
            '@media (max-width:400px)': {
              position: 'static',
              transform: 'none',
              mx: 'auto',
            }
          }}
        >
          <Button
            onClick={() => { handleCloseModal() }}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              mt: 2,
            }}
          >
            Close
          </Button>

          {/* Logo */}
          <div style={{ margin: '8px', textAlign: 'center' }}>
            <img 
              src= {ceinsysLogo}
              alt="Logo" 
              style={{ width: '200px', height: '80px', display: 'inline-block' }} 
            />
          </div>

          <Typography variant="h5" component="h1" textAlign="center">
           Change Password?
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              type={showPassword ? 'text' : 'password'}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                // onClick={handleSubmit}
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  '&:hover': {
                    boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                Sign In
              </Button>
              <ToastContainer />
            </div>
           
          </Box>
        </Box>
      </Grid>
    </Grid>
  </div>
   

   
     
             
  );
};

export default ForgotPassword;