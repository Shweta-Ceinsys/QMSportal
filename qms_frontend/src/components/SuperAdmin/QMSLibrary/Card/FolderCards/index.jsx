
import { Box, Button, IconButton, Modal, Paper, TextField, Tooltip } from "@mui/material";
import Card from "./FolderCard";
import Grid from "@mui/material/Grid";
import Topbar from "../../../Topbar"
import SuperAdminService from "../../../../../Services/superadmin"
import { useContext, useEffect, useState, version } from "react";
import { useLocation } from "react-router-dom";
// import CircularLoading from "../../../global/Circularloading";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../../DataContext";
const FolderCards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const versionId = queryParams.get('versionId');
  const versionIName = queryParams.get('versionName');
  const { dataId } = useContext(DataContext);
   const [getallDir, setGetallDir] = useState([]);
   const { setData } = useContext(DataContext);
  //  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(() => {
    // setIsLoading(true);
    const storedId = sessionStorage.getItem('versionId');
  if (storedId) {
    setData({ id: storedId, version: sessionStorage.getItem('versionName') });
  }
    SuperAdminService.getDir(dataId.id)
    .then((response) => {
      setGetallDir(response.data);
      console.log("Versionid",dataId.id)

    })
    .catch((error) => {
      console.error('Error fetching Model List:', error);
      // setIsLoading(false);
    });
   
  }, [dataId.id]);



  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([]);
  const username = sessionStorage.getItem("Name");
  const idString = sessionStorage.getItem("UserId"); // Retrieves the UserId as a string
  const  CurrentUser = Number(idString);
  
  
  const handleOpenModal = () => {
    setOpenModal(true);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [addFolder, setAddFolder] = useState({
    name: "",
    version:dataId.id,
    created_by:CurrentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'month') {
    //   // Ensure the month value is between 01 and 12
    //   if (/^(0[1-9]|1[0-2])?$/.test(value)) {
    //     setAddFolder((prev) => ({ ...prev, [name]: value }));
    //   }
    // } else if (name === 'year') {
    //   // Ensure the year value is a 4-digit number
    //   if (/^\d{0,4}$/.test(value)) {
    //     setAddFolder((prev) => ({ ...prev, [name]: value }));
    //   }
    // }
    setAddFolder((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // =====================================================================Code For Add User Form==========================================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addFolder.name.trim().length === 0) {
        toast.warning("Please Enter  Folder Name!");
      }  else {
        const response = SuperAdminService.createDir(addFolder);
        toast.success("Folder added successfully!");

        setAddFolder({
          name: "",
          version: 0,
          created_by:0,
        });

        handleCloseModal();
      }
    } catch (error) {
      console.error("Error Creating Folder:", error);
      toast.error("Failed to Create Folder!");
    }
  };

  // ============================================================================Code For  Add User Component===============================================================

  const AddVersionModal = (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="add-user-modal"
      aria-describedby="modal-to-add-new-user"
      sx={{ zIndex: 999991 }}
    >
      <Grid
        container
        alignItems="flex-start"
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Grid item xs={11} sm={11} md={8} lg={5} xl={5}>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              // padding: "20px",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
              border: "4px solid #CDF0EA",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ alignItems: "center" }}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                sx={{
                  backgroundColor: "#CDF0EA",
                  boxShadow: 5,
                }}
              >
                <Box
                  className="textname"
                  sx={{
                    padding: "20px",
                    fontSize: {
                      xs: "16px",
                      sm: "24px",
                      md: "28px",
                      xl: "30px",
                    },
                  }}
                >
                  <span>Add New Folder</span>
                </Box>
                <Box>
                  <IconButton
                    sx={{ color: "#1C1678", padding: "20px" }}
                    onClick={handleCloseModal}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: "20px" }}>
                <TextField
                  label="Folder Name"
                  type="text"
                  name="name"
                  required
                  value={addFolder.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                

                <Button
                  type="submit"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#CDF0EA",
                    color: "black",
                    "&:hover": {
                      // Apply styles on hover
                      backgroundColor: "#A4BCDB",
                      boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                    },
                    margin: "0 auto", // Center the button horizontally
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );

  
  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
    <main className="content">
      <Topbar />

      <Box display="flex"  justifyContent="flex-start" alignItems={"center"} marginTop={"90px"} >
        <Grid container alignItems={"center"}>
          <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
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
          <Grid item xs="11" sm="11" md="5" lg="5" xl="">
          <Box >
            <span style={{fontWeight:"bold"}} > {dataId.version}</span>
         
        </Box>

</Grid>
<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display={"flex"} justifyContent={"flex-end"} m={1}>
                <Box>
                  <Tooltip title="Add Version">
                    <Button
                      size="small"
                       onClick={handleOpenModal}
                      startIcon={<AddCircleOutlineOutlinedIcon color="black" />}
                      sx={{
                        m: 1,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "#CDF0EA",
                        color: "black",
                        boxShadow: 4,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#A4BCDB",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                      }}
                    >
                      ADD Folder
                      {/* ADD Directory */}
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
        </Grid>
        
         
        </Box>
       
    <Box m={2}>
          
      <Grid container spacing={0.2} >
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
    {AddVersionModal}
    </main>
    
    </div>
    
  );

};

export default FolderCards;
