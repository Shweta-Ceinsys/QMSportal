import React, { useState,useContext } from 'react';
import './Login.css';
// import { ColorModeContext, tokens,themeSettings } from "../../theme";
import {  Button, Typography, Box, Modal, TextField,Link,useTheme,IconButton, InputAdornment, Alert} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
// import  "../../theme";

import ceinsysLogo from "../../images/Ceinsys.jpg"

import AuthService from "../../Services/AuthService"

// function Copyright(props) {
//   return (
//     <Typography 
//     variant="body2" 
//     color="text.secondary" 
//     align="center" 
//     style={{
//       position: 'fixed',
//       bottom: 0,
//       right: 0,
//       padding: '8px', // Adjust padding as needed
//       color: 'white'
//     }}
//     {...props}
//   >
//     {'Copyright © www.ceinsys'}
//     <Link color="inherit" href="#">
//     </Link>{' '}
//     {new Date().getFullYear()}
//     {'.'}
//   </Typography>
//   );
// }


const Login = ({ onLoginClick }) => {
 
  // Manually set theme mode to "light" for this specific page
  const mode = "light";

  let navigate = useNavigate();
  // Create theme with light mode settings
  // const theme = createTheme(themeSettings(mode));
  // const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
  // const { toggleColorMode } = useContext(ColorModeContext)
  
  
  


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

  const handleSubmit = (event) => {
    event.preventDefault();
   
    if (email.trim().length === 0 && password.trim().length === 0) {
      toast.warning('Please Enter Credentials !');
    } else if (email.trim().length === 0 ) {
      toast.warning('Please Enter Username!');
    } else if (password.trim().length === 0) {
      toast.warning('Please Enter Password!');
    }else {
     
      try {
      AuthService.login(email, password).then(
        () => {
          const role = (sessionStorage.getItem("Role"));
          console.log(role); 
          if (role === "SUPER_ADMIN") {
            navigate("/user")
          } else if (role === "ADMIN") {
            navigate("/user");
          } else if (role === "USER") {
            navigate("/user");
          }  else {
            toast.error('Invalid Role!'); 
          } 
        },
        (error) => {
          console.error('Login error:', error);
          toast.error('Invalid Credentials!');
          

        }
      );
  } catch (error) {
    toast.info('Unexpected Error!');
  }
}
    
    
  };

  return (
    // <ThemeProvider theme={theme}>
    <div >
      
        <Box sx={{display:'flex',justifyContent: 'center', alignItems: 'center',}}>

  

 
        <Box
          sx={{
              position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            alignItems: 'center',
            width: 'auto',
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            
          }}
        >
          <Button onClick={handleCloseModal} sx={{ 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  mt: 2,}}>
               Close
          </Button>
            
            
            {/* Logo */}
   
            <div style={{ margin: '8px', textAlign: 'center' }}>
              <img 
                src="ceinsysLogo" 
                alt="Logo" 
                style={{ width: '200px', height: '80px', display: 'inline-block' }} 
              />
            </div>

          <Typography  variant="title" component="h1" textAlign="center" >
            Sign In
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
                autoFocus
                name="password"
                label="Password"
               
                type={showPassword ? 'text' : 'Password'}
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
                        onClick={handleSubmit} 
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, 
                          '&:hover': { // Apply styles on hover
                            // bgcolor: colors.blueAccent[600], // Change background color
                            boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)' // Apply box shadow
                          }
                        }}
                      >
                        Sign In
                      </Button>
                      <ToastContainer />
                    </div>

                    <div textAlign="center" >
                      <Link href="#" variant="body2" >
                        Forgot password?
                      </Link>
                    </div>
                 
          </Box>
        </Box>
        </Box>
    </div>
    // </ThemeProvider>

   
     
             
  );
};

export default Login; 
