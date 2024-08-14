import { Box,  Button,  Dialog,  DialogActions,  Grid,  IconButton,  Tooltip,  Typography } from "@mui/material";
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
import { toast } from "react-toastify";
import SuperAdminService from "../../../../Services/superadmin";
import CloseIcon from "@mui/icons-material/Close";
const Card = (props) => {
  const param = props;
  const imageURL = car;
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [ecu, setEcu] = useState([]);
  const [open, setOpen] = useState(false);
  const userId = sessionStorage.getItem("UserId");
  const userid = Number(userId);
 
 
 


  let navigate = useNavigate();
 const  handleNavigate =(id,version)=>{
  // navigate(`/fCards?versionId=${id}`);
  navigate(`/afCards?versionId=${id}&versionName=${version}`);
 }



 const [DialogOpen, setDialogOpen] = useState(false);

 const [vid, setFId] = useState(false);
 const DeletehandleClose = () => {
   setDialogOpen(false);
 }
 const DeleteHandleOpen =(vId) =>{
   setFId(vId);
   setDialogOpen(true);
 }
 const handleDelete = () => {
  SuperAdminService.deleteVersion(vid)
    .then((response) => {
      toast.success("Version Deleted Successfully");
      setDialogOpen(false);
     
    })
    .catch((error) => {
      console.error("Error deleting Version:", error);
      toast.error("Failed to Delete Version");
    });
};

const DeleteDialog = (
  <Dialog
    open={DialogOpen}
    onClose={() => setDialogOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    sx={{
      zIndex: 999991,
      // "& .MuiDialog-paper": {
      //   width: 600, // Set the maximum width as per your requirement
      // },
    }}
  >
    
    
      
      
      <DialogActions
     
    >
      <Grid container spacing={1}>
        <Grid item xl="12" lg="12" md="12" sm="12" xs="12">
        <Box display={"flex"} justifyContent={"space-between"} >
     
     <Typography
       variant="body2"
       // color={colors.redAccent[700]}
       fontWeight={"bold"}
      paddingTop={1}
     >
       Do you want to Delete this Version?
     </Typography>
    
    
     <IconButton
     aria-label="close"
     onClick={DeletehandleClose}
    
    //  sx={{
    //    position: "absolute",
    //    right: 8,
    //    top: 8,
    //    // color: (theme) => theme.palette.grey[500],
    //  }}
   >
     <CloseIcon />
   </IconButton>
     
     </Box>
        </Grid>
        <Grid item  xl="12" lg="12" md="12" sm="12" xs="12">
        <Box  >
      <Button
        sx={{
          // backgroundColor: colors.blueAccent[600],
          // color: colors.grey[100],
          fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
          fontWeight: "bold",
          padding: "5px 10px",
          backgroundColor: "#F5A4A0",
          color: "black",
          boxShadow: 2,
          "&:hover": {
            // Apply styles on hover
            // bgcolor: colors.blueAccent[600], // Change background color
            boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
          },
        }}
        onClick={handleDelete}
        color="primary"
      >
        OK
      </Button>
      </Box>
        </Grid>
      </Grid>
      
      
    </DialogActions>
      
   
   
    
    
  </Dialog>
);
const handleLaunch = (vid) => {
  SuperAdminService.versionlaunch(vid,userid)
    .then((response) => {
      toast.success("Version Launched Successfully");
     
    })
    .catch((error) => {
      console.error("Error when Launching Version:", error);
      toast.error("Failed to Launch Version");
    });
};
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
                      onClick={() => DeleteHandleOpen(param.id)}
                    
                      sx={{
                        width:"100%",
                         marginTop:4,
                        fontSize: {xl:"13px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
                        fontWeight: "bold",
                        padding: "5px 10px",
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
                      onClick={() =>  handleLaunch(param.id)}
                      disabled={param.launch
                      }
                      sx={{
                        width:"100%",
                         marginTop:4,
                         fontSize: {xl:"13px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
                        fontWeight: "bold",
                        padding: "5px 10px",
                        backgroundColor: "#CDF0EA",
                        color: "black",
                        boxShadow: 2,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#A4BCDB",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                        "&:disabled": {
                          // Apply styles on hover
                          color:"green",
                          backgroundColor: "lightgrey",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                      }}
                    >
                    {param.launch ? "Launched" :"Launch"}
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
    {DeleteDialog}

    </Box>
  );
};
export default Card;
