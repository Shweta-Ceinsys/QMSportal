import React, { useState,useContext } from 'react';
import './Login.css';
// import { ColorModeContext, tokens,themeSettings } from "../../theme";
import {  Button, Typography, Box, Modal, TextField,Link,useTheme,IconButton, InputAdornment, Alert, Grid, Paper} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




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

  const mode = "light";

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
            navigate("/qmsLibrary")
          } else if (role === "ADMIN") {
            navigate("/aQmsLibrary");
          } else if (role === "USER") {
            navigate("/uQmsLibrary");
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
   
    <div  className="app" style={{ backgroundColor: '#EEF0F6',  }}>
  

    <Grid container spacing={0} sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
    <Grid item xs={false} sm={1} md={1} lg={2} xl={2} />
      <Grid  item xs={12} sm={10} md={10} lg={8} xl={8} >
        <Paper elevation={3} sx={{ backgroundColor:'#CDF0EA',  }}>
          <Grid container spacing={0} >
          <Grid item xs={false} sm={5} md={7} lg={7} xl={7} sx={{display:"flex",justifyContent:"center",alignItems:"center"}} >
            <Box   textAlign={"center"} >
              <h1 >
                Welcome to Ceinsys, Pune
              </h1>
              <h3 >
                QMS Document Center
              </h3>
            </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={5} lg={5} xl={5} >
            <Box
          sx={{
            bgcolor: 'white',
            p: 4,
        
          }}
        >
          <Box  sx={{height:'100%'}}>
          <div style={{ margin: '8px', textAlign: 'center' }}>
            <img 
              src= {ceinsysLogo}
              alt="Logo" 
              style={{ width: '200px', height: '80px', display: 'inline-block' }} 
            />
          </div>

          <Typography variant="h5" component="h1" textAlign="center">
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
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor:"#CDF0EA",
                  color:"black",
                  "&:hover": {
                    // Apply styles on hover
                    backgroundColor:"#A4BCDB",
                    boxShadow:
                      "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                  },
                }}
              >
                Sign In
              </Button>
              <ToastContainer />
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </div>
          </Box>
          </Box>
          {/* <Button
            onClick={() => { handleCloseModal() }}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              mt: 2,
            }}
          >
            Close
          </Button> */}

        
          
        </Box>
 
            </Grid>
            
          </Grid>


        </Paper>

      </Grid>
      <Grid item xs={false} sm={1} md={1} lg={2} xl={2} />

    </Grid>
  </div>
   

   
     
             
  ); 
};

export default Login; 
