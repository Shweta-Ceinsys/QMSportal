
import { Box, IconButton, Tooltip } from "@mui/material";
import Card from "./FolderCard";
import Grid from "@mui/material/Grid";
import Topbar from "../../../Topbar"
import SuperAdminService from "../../../../../Services/superadmin"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import CircularLoading from "../../../global/Circularloading";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
const FolderCards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const versionId = queryParams.get('versionId');
  const versionIName = queryParams.get('versionName');
  
   const [getallDir, setGetallDir] = useState([]);
  //  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(() => {
    // setIsLoading(true);
    SuperAdminService.getDir(versionId)
    .then((response) => {
      setGetallDir(response.data);
      console.log("id",response.data.id)

    })
    .catch((error) => {
      console.error('Error fetching Model List:', error);
      // setIsLoading(false);
    });
   
  }, []);

  
  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
    <main className="content">
      <Topbar />

      <Box display="flex"  justifyContent="flex-start" alignItems={"center"} marginTop={"90px"} >
        <Grid container alignItems={"center"}>
          <Grid item xs="3" sm="3" md="3" lg="3" xl="1">
          <Box>
        <Tooltip title="Back">
          <IconButton href="/qmsLibrary"
          // onClick={()=>toggleTable(param.dirId)}
          >
                   <ArrowBackOutlinedIcon variant="outlined" sx={{color:"black"}} />
                  
          </IconButton>
          </Tooltip>
          </Box>
          </Grid>
          <Grid item xs="7" sm="7" md="7" lg="7" xl="7">
          <Box >
            <span style={{fontWeight:"bold"}} > {versionIName}</span>
         
        </Box>

</Grid>
        </Grid>
        
         
        </Box>
       
    <Box m={2}>
          
      <Grid container spacing={0.3} >
        {getallDir.map((card, id) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card
            dirId={card.id}
            name={card.name}
            
            
            />
          </Grid>
        ))}
      </Grid>
       
    </Box>
    </main>
    </div>
    
  );

};

export default FolderCards;
