import { Box,  Button,  Grid,  IconButton,  Tooltip,  Typography } from "@mui/material";
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
import folderImage from  "../../../../images/folder.png"
const Card = (props) => {
  const param = props;
  const imageURL = car;
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [ecu, setEcu] = useState([]);
  const [open, setOpen] = useState(false);
  const userId = sessionStorage.getItem("UserId");
  // const [isLoading, setIsLoading] = useState(false);
 
 
 


  let navigate = useNavigate();
 const  handleNavigate =(id,version)=>{
  // navigate(`/fCards?versionId=${id}`);
  navigate(`/fCards?versionId=${id}&versionName=${version}`);
 }
  return (
    <Box>
       {/* <CircularLoading isLoading={isLoading} /> */}
      <Box
        className="compactCard"
      
        sx={{
           background: 'white',
          display:"flex",
          flexDirection:"row",
           boxShadow: 4,
          "&:hover": {
            // backgroundColor: colors.purpleAccent[800],
            // color: colors.grey[900],
            // boxShadow: `5px 5px 2px  ${colors.purpleAccent[300]}`,
          },
        }}
      
      >

        <Grid container>
        <Grid item xs="5" sm="5" md="5" lg="5" xl="5" sx={{ display: "flex",
           
           alignItems:"center",}}>
            <Box >
              <img
                src={folderImage}
                alt="Folder"
                style={{
                  width: "100%",
                  // height: "170px",
                  height: {xl:"170px",lg:"160px",md:"140px" ,sm:"120px",xs:"110px"},
                  display: "inline-block",
                  opacity: 0.3,
                  // paddingLeft: "20px"
                }}
              />
            </Box>
          </Grid>
          <Grid item xs="7" sm="7" md="7" lg="7" xl="7" display="flex" flexDirection="column"  >
             <Box >
        <Box display="flex"  justifyContent="flex-end" >
          <IconButton onClick={()=>handleNavigate(param.id,param.version)}>
                   <ArrowForwardIcon variant="outlined" sx={{color:"black"}} />
                  
          </IconButton>
          
        </Box>
        <Box  display="flex"  justifyContent="center" alignContent="center">
        
          
          <Box  sx={{
            // color: colors.grey[100], 
            fontSize: {
              xs: '1rem',
              sm: '0.8rem',
              md: '1rem'
            }
          }} >
            <span><b >{param.version}  </b></span><br/>
            <span><b >{param.month} {param.year}</b></span>
          </Box>

        
          {/* <Box display="flex" sx={{
            // color: colors.grey[100], 
            fontSize: {
              xs: '1rem',
              sm: '0.8rem',
              md: '1rem'
            }
          }} >
            <span><b >{param.month} {param.year}</b></span>
          </Box>
           */}
          
        </Box>
        <Box display={"flex"} justifyContent={"flex-start"}  >
          <Grid container spacing={0.5}>
            <Grid  item xs="5" sm="5" md="5" lg="5" xl="5">
            <Box>
                  <Tooltip title="Delete">
                    <Button
                      size="small"
                      // onClick={handleOpenModal}
                    
                      sx={{
                        width:"100%",
                         marginTop:4,
                        fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
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
            </Grid>
            <Grid  item xs="5" sm="5" md="5" lg="5" xl="5">
            <Box>
                  <Tooltip title="Launch">
                    <Button
                      size="small"
                      // onClick={handleOpenModal}
                    
                      sx={{
                        width:"100%",
                         marginTop:4,
                         fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
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
            </Grid>
          </Grid>
                
                
              </Box>
              </Box>
          </Grid>
        </Grid>
        
       
      </Box>
      

    </Box>
  );
};
export default Card;
