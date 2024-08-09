import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./FolderCard.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SuperAdminService from "../../../../../Services/superadmin";
import folderImage from  "../../../../../images/folder.png"
import FolderUpload from "../../../../../images/FolderUpload.png"
import { ToastContainer, toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
const FolderCard = (props) => {
  const param = props;
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const toggleTable = (dirId) => {
    setOpen(!open);
    SuperAdminService.getFilesByDirId(dirId)
    .then((response) => {
      setRows(response.data);
      

    })
    .catch((error) => {
      console.error('Error fetching Model List:', error);
      // setIsLoading(false);
    });
  };

     const handleEdit =(id) =>{
      console.log("Edit")
     }
 
     const handleDelete =(id) =>{
      console.log("Delete")
     }


     const [openModal, setOpenModal] = useState(false);
     const [getVid, setVid] = useState(0);
    
     const handleOpenModal = (dirId) => {
      setVid(dirId);
       setOpenModal(true);
     };
   
     const handleCloseModal = () => {
       setOpenModal(false);
     };
   
   
   
     const [files, setFiles] = useState([]);
    //  const [fileName, setFileName] = useState('');
   
     // Handle file selection from file input
     const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length) {
        setFiles(selectedFiles);
      }
    };
   
     // Handle file drop
     const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const droppedFiles = Array.from(event.dataTransfer.files);
      if (droppedFiles.length) {
        setFiles(droppedFiles);
      }
    };
   
     // Prevent default behavior for dragover
     const handleDragOver = (event) => {
       event.preventDefault();
     };
   
     // Handle file submission
     const handleSubmit = () => {
      if (!files.length) return;
    
      // Create a FormData object
      const formData = new FormData();
      
      files.forEach((file) => {
        formData.append('files', file); // Append each file to FormData
      });
      formData.append('dirId', getVid);
      
      SuperAdminService.uploadBulkFiles(formData)
        .then(response => {
          
          toast.success("Files Uploaded successfully!");
          
          // Handle success
        })
        .catch(error => {
          console.error('Error uploading files:', error);
          toast.error("Failed to upload Files!");
        });
        handleCloseModal();
      setFiles([]);
    };
   
    const handleCancel = () => {
      setFiles([]);
    };
   
   
   
     const FileUploadModal = (
      <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="add-user-modal"
      aria-describedby="modal-to-add-new-user"
      sx={{ zIndex: 999991 }}
    >
      <Grid
        container
       
        sx={{
          height: "100%",
          width: "100%",
          display:"flex",
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
             
              overflowY: "auto",
              border: "4px solid #CDF0EA"
            }}
          >
          <Box display={"flex"} justifyContent={"flex-end"}>

            <IconButton onClick={handleCloseModal}>
< CloseIcon/>
            </IconButton>
          </Box>
              
          <Box sx={{ padding: "20px" }}>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: '2px dashed #cccccc',
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '20px',
                backgroundImage:{FolderUpload}
              }}
            >
              <img src={FolderUpload} alt="Upload" height={'100vh'} style={{opacity:"0.5"}}/>
              <p style={{opacity:"0.3"}}>Drag & drop files here, or click to select files</p>
              <input
                type="file"
                accept="*/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
                multiple
                webkitdirectory
              />
              <label htmlFor="file-input" style={{ cursor: 'pointer' ,"&:hover": {
             backgroundColor: 'yellow',
             color: "blue",
          
          },}}>
            <b>Select Files</b>
                
              </label>
            </div>
            
            <div>
              <Grid container spacing={0.5}>
                <Grid item xs="3" sm="3" md="3" lg="3" xl="3">
                <Button onClick={handleSubmit}  sx={{
                        width:"100%",
                        marginRight: '10px' ,
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
                      }} >
                Submit
              </Button>
                </Grid>
                <Grid item xs="3" sm="3" md="3" lg="3" xl="3">
                <Button sx={{
                        width:"100%",
                        // marginRight: '10px' ,
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
                      }} onClick={handleCancel}>Cancel</Button>
                </Grid>
              </Grid>
              
              
            </div>
            <Box sx={{ marginBottom: '20px' }}>
              {files.length > 0 ? (
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No files selected</p>
              )}
            </Box>
          </Box>
            
          </Paper>
        </Grid>
      </Grid>
    </Modal>
     );
   
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
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
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
             icon={<DownloadOutlinedIcon variant="outlined" color="primary" size="small" />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <DeleteIcon variant="outlined" color="secondary" size="small" />
            }
            label="Delete"
             onClick={() => handleDelete(row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  

  return (
    <Box>
      
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
          <IconButton onClick={()=>toggleTable(param.dirId)}>
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
            <span><b >{param.name}  </b></span><br/>
            
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
                      //  onClick={handleOpenModal}
                    
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
                  <Tooltip title="Upload">
                    <Button
                      size="small"
                       onClick={()=>handleOpenModal(param.dirId)}
                    
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
                    Upload
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
      
      <Box >
      {open && ( // Conditionally render the DataGrid
        <Box style={{ height: `calc(100vh - 300px)`, padding: "1%", }} marginLeft={"1.5%"}>
          <DataGrid
            rows={rows}
            columns={columns}
            stickyHeader
          />
        </Box>
      )}
      </Box>
        {FileUploadModal}
        <ToastContainer style={{zIndex:9999991}} />
    </Box>
  );
};
export default FolderCard;
