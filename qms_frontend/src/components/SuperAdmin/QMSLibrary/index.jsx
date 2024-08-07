import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Topbar from "../Topbar";
import Cards from "./Card";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import SuperAdminService from "../../../Services/superadmin";
const QmsLibrary = () => {
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

  const [addVersions, setAddVersion] = useState({
    version: "",
    month: "",
    year: "",
    created_by:CurrentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'month') {
    //   // Ensure the month value is between 01 and 12
    //   if (/^(0[1-9]|1[0-2])?$/.test(value)) {
    //     setAddVersion((prev) => ({ ...prev, [name]: value }));
    //   }
    // } else if (name === 'year') {
    //   // Ensure the year value is a 4-digit number
    //   if (/^\d{0,4}$/.test(value)) {
    //     setAddVersion((prev) => ({ ...prev, [name]: value }));
    //   }
    // }
    setAddVersion((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // =====================================================================Code For Add User Form==========================================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addVersions.version.trim().length === 0) {
        toast.warning("Please Enter  Version Name!");
      } else if (addVersions.month.trim().length === 0) {
        toast.warning("Please Enter Month!");
      } else if (addVersions.year.trim().length === 0) {
        toast.warning("Please Enter Year!");
      } else {
        const response = SuperAdminService.addVersion(addVersions);
        toast.success("Version added successfully!");

        setAddVersion({
          version: "",
          month: "",
          year: "",
          created_by:CurrentUser,
        });

        handleCloseModal();
      }
    } catch (error) {
      console.error("Error adding Version:", error);
      toast.error("Failed to add Version!");
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
                  <span>Add Version</span>
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
                  label="Version"
                  type="text"
                  name="version"
                  required
                  value={addVersions.version}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Month"
                  type="text"
                  name="month"
                  required
                  value={addVersions.month}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  placeholder="MM" // Optional: Helps the user understand the expected format
                />

                <TextField
                  label="Year"
                  type="text"
                  name="year"
                  required
                  value={addVersions.year}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  placeholder="YYYY" // Optional: Helps the user understand the expected format
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
        <Box marginTop={"75px"}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display={"flex"} justifyContent={"flex-start"}>
                <h3 >Welcome {username}</h3>
                
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
                      ADD Version
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box>
          <Cards />
          </Box>
           
        </Box>
        {AddVersionModal}
      </main>
      
      <ToastContainer style={{ zIndex: "1000000" }} />
    </div>
  );
};

export default QmsLibrary;
