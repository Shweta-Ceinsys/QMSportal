import { Box,  Button,  Dialog,  DialogActions,  Grid,  IconButton,  Tooltip,  Typography } from "@mui/material";
import { useState,  useContext } from "react";
import "./Card.css";

 import car from '../../../../images/car.png';
 import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

import folderImage from  "../../../../images/folder.png"
import { toast } from "react-toastify";
import SuperAdminService from "../../../../Services/superadmin";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../DataContext";
const Card = (props) => {
  const param = props;
 
  const { setData } = useContext(DataContext);
 

  const userId = sessionStorage.getItem("UserId");
  const userid = Number(userId);
  const [isLaunched, setIsLaunched] = useState(param.launch);
 
 


  let navigate = useNavigate();
 const  handleNavigate =(id,version)=>{
  sessionStorage.setItem('versionId', id);
  sessionStorage.setItem('versionName', version);
  setData({ id, version });
   navigate(`/afCards`);

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
     
    }}
  >
    
    
      
      
      <DialogActions
     
    >
      <Grid container spacing={1}>
        <Grid item xl="12" lg="12" md="12" sm="12" xs="12">
        <Box display={"flex"} justifyContent={"space-between"} >
     
     <Typography
       variant="body2"
      
       fontWeight={"bold"}
      paddingTop={1}
     >
       Do you want to Delete this Version?
     </Typography>
    
    
     <IconButton
     aria-label="close"
     onClick={DeletehandleClose}
    
   
   >
     <CloseIcon />
   </IconButton>
     
     </Box>
        </Grid>
        <Grid item  xl="12" lg="12" md="12" sm="12" xs="12">
        <Box  >
      <Button
        sx={{
        
          fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
          fontWeight: "bold",
          padding: "5px 10px",
          backgroundColor: "#F5A4A0",
          color: "black",
          boxShadow: 2,
          "&:hover": {
           
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
      setIsLaunched(true); 
     
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
                 
                  height: {xl:"170px",lg:"160px",md:"140px" ,sm:"120px",xs:"110px"},
                  display: "inline-block",
                  opacity: 0.3,
                 
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
             
            fontSize: {
              xs: '1rem',
              sm: '0.8rem',
              md: '1rem'
            }
          }} >
            <span><b >{param.version}  </b></span><br/>
            <span><b >{param.month} {param.year}</b></span>
          </Box>

        
         
          
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
                        
                        "&:hover": {
                        
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
                    {isLaunched ? "Launched" :"Launch"}
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
