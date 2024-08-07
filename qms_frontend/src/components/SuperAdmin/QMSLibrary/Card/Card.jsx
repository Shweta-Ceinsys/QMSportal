import { Box,  Button,  IconButton,  Tooltip,  Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./Card.css";
import Fab from "@mui/material/Fab";
// import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../../../theme";
 import car from '../../../../images/car.png';
 import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
const Card = (props) => {
  const param = props;
  const imageURL = car;
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [ecu, setEcu] = useState([]);
  const [open, setOpen] = useState(false);
  const userId = sessionStorage.getItem("UserId");
  // const [isLoading, setIsLoading] = useState(false);
 
  const toggleTable = () => {
    setOpen(!open);
  };


  let navigate = useNavigate();
 const  handleNavigate =(id)=>{
  navigate(`/fCards?versionId=${id}`);
 }
  return (
    <Box>
       {/* <CircularLoading isLoading={isLoading} /> */}
      <Box
        className="compactCard"
        onClick={toggleTable}
        sx={{
           background: 'white',
          
           boxShadow: 4,
          "&:hover": {
            // backgroundColor: colors.purpleAccent[800],
            // color: colors.grey[900],
            // boxShadow: `5px 5px 2px  ${colors.purpleAccent[300]}`,
          },
        }}
      
      >
        <Box display="flex"  justifyContent="flex-end" >
          <IconButton onClick={()=>handleNavigate(param.id)}>
                   <ArrowForwardIcon variant="outlined" sx={{color:"black"}} />
                  
          </IconButton>
          
        </Box>
        <Box className="radialBar" display="flex" flexDirection="column" justifyContent="center"
          alignItems="center">
        
          
          <Box display="flex" sx={{
            // color: colors.grey[100], 
            fontSize: {
              xs: '1rem',
              sm: '0.8rem',
              md: '1rem'
            }
          }} >
            <span><b >{param.version}  </b></span>
          </Box>

        
          <Box display="flex" sx={{
            // color: colors.grey[100], 
            fontSize: {
              xs: '1rem',
              sm: '0.8rem',
              md: '1rem'
            }
          }} >
            <span><b >{param.month} {param.year}</b></span>
          </Box>
          
          
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} >
                <Box>
                  <Tooltip title="Delete">
                    <Button
                      size="small"
                      // onClick={handleOpenModal}
                    
                      sx={{
                         m: 1,
                         marginTop:4,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "#F5A4A0",
                        color: "black",
                        boxShadow: 2,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#A4BCDB",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                      }}
                    >
                    Delete
                    </Button>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Launch">
                    <Button
                      size="small"
                      // onClick={handleOpenModal}
                    
                      sx={{
                         m: 1,
                         marginTop:4,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "#CDF0EA",
                        color: "black",
                        boxShadow: 2,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#A4BCDB",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                      }}
                    >
                     Launch
                    </Button>
                  </Tooltip>
                </Box>
              </Box>

      </Box>
      

    </Box>
  );
};
export default Card;
