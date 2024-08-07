
import { Box } from "@mui/material";
import Card from "./FolderCard";
import Grid from "@mui/material/Grid";
import Topbar from "../../../Topbar"
import SuperAdminService from "../../../../../Services/superadmin"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import CircularLoading from "../../../global/Circularloading";
const FolderCards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const versionId = queryParams.get('versionId');
  
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
    <Box m={2} marginTop={"90px"}>
          
      <Grid container spacing={0.3} >
        {getallDir.map((card, id) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card
            Vid={card.id}
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
