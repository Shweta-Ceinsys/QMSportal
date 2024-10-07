import { ToastContainer, toast } from "react-toastify";
import Topbar from "../../../../Topbar";
import { Box, Button, Dialog, DialogActions,  FormControl,  Grid, IconButton, Modal, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SuperAdminService from "../../../../../../Services/superadmin";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../../../DataContext";


const ListFiles =(props) =>{
    const [rows, setRows] = useState([]);
    
    const { setDirId } = useContext(DataContext);
    const { dirId } = useContext(DataContext);
    const UserId = sessionStorage.getItem("UserId");
     useEffect(() => {
      // Fetch files based on directory ID
      const storedId = sessionStorage.getItem('directoryId');
      setDirId(storedId);
      SuperAdminService.getFilesByDirId(storedId)
          .then((response) => {
              // Map rows to include serial numbers
              const rowsWithSerialNumbers = response.data.map((row, index) => ({
                  ...row,
                  serialNumber: index + 1, // 1-based serial number
              }));
              setRows(rowsWithSerialNumbers);
          })
          .catch((error) => {
              console.error('Error fetching files:', error);
          });
  }, []);
      
  let navigate = useNavigate();
  const  handleNavigate =()=>{
    
    navigate(`/afCards`);
   
   }
   const handleDownload = (id) => {
    SuperAdminService.downloadFile(id,UserId)
      .then((response) => {
        // Get Content-Disposition header
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'downloaded-file'; // Default filename if not specified

        if (contentDisposition) {
          // Extract filename from Content-Disposition header
          const filenameRegex = /filename[^;=\n]*=[\'"]?([^\'";\n]*)[\'"]?/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = decodeURIComponent(matches[1]); // Decode and use the filename
          }
        }

        // Create a Blob object with the correct Content-Type
        const blob = new Blob([response.data], { type: response.headers.get('content-type') });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Use the extracted filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL object

        toast.success("File downloaded successfully");
      })
      .catch((error) => {
        toast.error("File download failed");
        console.error('Error downloading file:', error);
      });
};
  
const [DialogOpen, setDialogOpen] = useState(false);

const [fId, setFId] = useState(false);
const DeletehandleClose = () => {
  setDialogOpen(false);
}
const DeleteHandleOpen =(id) =>{
  setFId(id);
  setDialogOpen(true);
}
const handleDelete = () => {
  
  SuperAdminService.deleteFile(fId)
    .then((response) => {
      toast.success("File Deleted Successfully");
      SuperAdminService.getFilesByDirId(dirId)
          .then((response) => {
              // Map rows to include serial numbers
              const rowsWithSerialNumbers = response.data.map((row, index) => ({
                  ...row,
                  serialNumber: index + 1, // 1-based serial number
              }));
              setRows(rowsWithSerialNumbers);
          })
          .catch((error) => {
              console.error('Error fetching files:', error);
          });
          setDialogOpen(false);
    })
    .catch((error) => {
      console.error("Error deleting File:", error);
      toast.error("Failed to Delete File");
    });
};
  
// -----------------------------------------------------------------Search Functionality----------------------------------------------------------------------------
const [searchText, setSearchText] = useState("");

const filteredRows = rows.filter((row) => {

  if (
    searchText &&
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  ) {
    return true;
  }
  return !searchText;
});



const handleSearchChange = (event) => {
  setSearchText(event.target.value);
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
       // color={colors.redAccent[700]}
       fontWeight={"bold"}
      paddingTop={1}
     >
       Do you want to Delete this File?
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
    const columns = [
      {
        field: 'serialNumber',
        headerName: 'Sr. No.',
        width: 150,
        
    },
        
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Actions",
          width: 150,
          cellClassName: "actions",
          getActions: ({ row }) => {
            return [
              <GridActionsCellItem
                 icon={<DownloadOutlinedIcon variant="outlined" color="primary" size="small" />}
                label="Edit"
                className="textPrimary"
                onClick={() => handleDownload(row.id,)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={
                  <DeleteIcon variant="outlined" color="secondary" size="small" />
                }
                label="Delete"
                 onClick={() => DeleteHandleOpen(row.id)}
                color="inherit"
              />,
            ];
          },
        },
      ];


      // -----------------------------------------------------Add sub Directory to Directory---------------------------------------
      
  const [openModal, setOpenModal] = useState(false);
  const storedId = sessionStorage.getItem('directoryId');
  const idString = sessionStorage.getItem("UserId"); // Retrieves the UserId as a string
  const CurrentUser = Number(idString);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [addFolder, setAddFolder] = useState({
    name: "",
    dir: storedId,
    created_by: CurrentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      } else {
        const response = SuperAdminService.createSubDir(addFolder);
        toast.success("Folder added successfully!");

        setAddFolder({
          name: "",
          dir:0,
          created_by: 0,
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
    return(


        <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
        <main className="content">
          <Topbar />
          <Box  >
          <Box
          display="flex"
          justifyContent="flex-start"
          alignItems={"center"}
          marginTop={"90px"}
          marginLeft="280px"
        >
          <Grid container alignItems={"center"}>
            <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
              <Box>
                <Tooltip title="Back">
                  <IconButton 
                  // onClick={navigateRoute}
                  >
                    <ArrowBackOutlinedIcon
                      variant="outlined"
                      sx={{ color: "black" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs="11" sm="11" md="5" lg="5" xl="">
              {/* <Box>
                <span style={{ fontWeight: "bold" }}> {dataId.version}</span>
              </Box> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display={"flex"} justifyContent={"flex-end"} m={1}>
                <Box>
                  <Tooltip title="Add Version">
                    <Button
                      size="small"
                       onClick={handleOpenModal}
                      // startIcon={<AddCircleOutlineOutlinedIcon color="black" />}
                      sx={{
                        m: 1,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "#d9d9f5",
                        color: "black",
                        boxShadow: 4,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#f4f1fb",
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
          {/* <Box marginLeft="280px">
          
            <DirectoryCards />
          
          </Box> */}
          <Paper elevation={2} sx={{ margin: "1%", marginTop: '10px', marginLeft:"290px" }}>
            <Box>
                   {/* Search TextField */}
                   <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 100 }}
                      >
                        <Typography sx={{ mr: 1 }}>Search:</Typography>
                        <TextField
                          variant="standard"
                          value={searchText}
                          onChange={handleSearchChange}
                          sx={{
                            ml: 1,
                            "& .MuiInputBase-root": {
                              color: "inherit", // Maintain text color
                            },
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "currentColor", // Maintain underline color
                            },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottomColor: "currentColor", // Maintain underline color on hover
                              },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "currentColor", // Maintain underline color after typing
                            },
                          }}
                        />
                      </FormControl>
            </Box>
          <Box sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },

                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#F0EBE3 !important",
                      borderBottom: "none",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    },

                    "& .MuiDataGrid-virtualScroller": {
                      // backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      // backgroundColor:'#F0EBE3' ,
                    },
                    "& .MuiCheckbox-root": {
                      // color: `${colors.greenAccent[200]} !important`,
                    },
                  }}  >
            <Box style={{ height: `calc(100vh - 240px)`,  }}
            >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            stickyHeader
          />
        </Box>
        </Box>
        </Paper>
        
          </Box>
 
        </main>
        {DeleteDialog}
        {AddVersionModal}
        <ToastContainer style={{ zIndex: "1000000" }} />
      </div>
    );


}

export default ListFiles;
