import React, { useState,useContext } from 'react';
import './Login.css';
import { ColorModeContext, tokens,themeSettings } from "../../theme";
import {  Button, Typography, Box, Modal, TextField,Link,useTheme,IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import  "../../theme";



import AuthService from "../../Services/AuthService"

function Copyright(props) {
  return (
    <Typography 
    variant="body2" 
    color="text.secondary" 
    align="center" 
    style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      padding: '8px', // Adjust padding as needed
      color: 'white'
    }}
    {...props}
  >
    {'Copyright © www.ceinsys'}
    <Link color="inherit" href="#">
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
  );
}


const Login = ({ onLoginClick }) => {
 
  // Manually set theme mode to "light" for this specific page
  const mode = "light";

  let navigate = useNavigate();
  // Create theme with light mode settings
  const theme = createTheme(themeSettings(mode));
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleColorMode } = useContext(ColorModeContext)
  
  
  


  const [username, setUsername] = useState("");
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
    const username = e.target.value;
    setUsername(username);
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
    // Handle form submission logic here

    if (username.length === 0 === 0) {
      toast.error('Please Enter Username!');
    } else if (password.length === 0) {
      toast.error('Please Enter Password!');
    } else {
      try {
      AuthService.login(username, password).then(
        () => {
          const role = (sessionStorage.getItem("Role")).toLowerCase();
          console.log(role); 
          if (role === "admin") {
            navigate("/AdminDashboard")
          } else if (role === "user") {
            navigate("/UserDashboard");
          } else if (role === "dealer") {
            navigate("/DealerDashboard");
          } else if (role === "supplier") {
            navigate("/SupplierDashboard");
          } else {
            toast.error('Invalid Role!'); 
          } 
        },
        (error) => {
          

        }
      );
  } catch (error) {
    toast.error('Invalid Credentials!');
  }
}
    
    
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="app">
      
    <Box
      sx={{
        position: 'relative',
        width: '100%', // Take full width
        height: '100%',
        backgroundImage: 'url(../../images/background2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(90%)',
      }}
    >
      {/* Text and Logo Container */}
      <div style={{
        textAlign: 'center',
        marginTop: '10vh',
      }}>
          
            {/* Logo */}
   
            <Box sx={{ mb:5,textAlign: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <img 
                src="../../images/Ceinsys.jpg" 
                alt="Logo" 
                style={{ width: '90px', height: '80px', display: 'inline-block', borderRadius: '8px' }} 
              />
            </Box>

        {/* Text */}
        <Typography variant="h1" component="h3" sx={{ color: 'white', fontSize: { 
                xs: '2rem', 
                sm: '3rem', 
                md: '4rem' 
              } }}>
          Welcome to 
        </Typography>
        <Typography variant="title" component="h1" sx={{ color: 'white', fontSize: { 
                xs: '2.5rem', 
                sm: '4rem', 
                md: '5rem' 
              }, mt: 2 }}>
          Fotomotive Platform
        </Typography>
        <Typography 
            variant="body1" 
            component="p" 
            sx={{ 
              color: 'white', 
              mt: 4,
              mx: { 
                xs: 2, 
                sm: 15, 
                md: 20 
              }, 
              fontSize: { 
                xs: '1rem', 
                sm: '1.3rem', 
                md: '1.5rem' 
              } ,
              textAlign: 'justify'
            }}
          >
            Explore our amazing features and services. 
            Ceinsys Tech is leveraging smart technology and analytics to deliver new age solutions in the Firmware over the Air (FOTA) technology,
            Ceinsys solutions are enabling organizations to efficiently deploy bug fixes,
            performance improvements, and new functionalities across a fleet of vehicles with minimal disruption to operations
          </Typography>

        {/* Button to open modal */}
        <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 4 , color: colors.grey[100], bgcolor:'white', width: '12%', '&:hover': { // Apply styles on hover
          bgcolor: colors.greenAccent[600], // Change background color
          boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)', // Apply box shadow
          color: colors.grey[900]
    }}}>
        Sign In
        </Button>
      </div>    
      <Copyright sx={{ mt: 5 }} /> 
    </Box>

    {/* Modal */}
    <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableBackdropClick={true}
        
      >
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
                src="../../images/Ceinsys.jpg" 
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
                label="Username"
                name="userName"
                value={username}
                onChange={onChangeUsername}
                autoFocus
                id="filled-basic"
                           
               
              />
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                name="password"
                label="Password"
               
                type={showPassword ? 'text' : 'password'}
                id="filled-basic"
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
                        sx={{ mt: 1, color: theme.palette.primary.contrastText, bgcolor: colors.blueAccent[300],
                          '&:hover': { // Apply styles on hover
                            bgcolor: colors.blueAccent[600], // Change background color
                            boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)' // Apply box shadow
                          }
                        }}
                      >
                        Sign In
                      </Button>
                    </div>

                    <div textAlign="center" >
                      <Link href="#" variant="body2" >
                        Forgot password?
                      </Link>
                    </div>
                 
          </Box>
        </Box>
      </Modal>
    </div>
    </ThemeProvider>

   
     
             
  );
};

export default Login; 
