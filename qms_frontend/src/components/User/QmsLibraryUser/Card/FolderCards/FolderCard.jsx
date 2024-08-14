import { Box, Button, Dialog, DialogActions, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Tooltip, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
const FolderCard = (props) => {
  const param = props;
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

const [dirIds, setDirIds] = useState(0);
const dir = useRef(0);
  // const toggleTable = (dirId) => {
  //   setOpen(!open);
  //   SuperAdminService.getFilesByDirId(dirId)
  //   .then((response) => {
  //     setRows(response.data);
      

  //   })
  //   .catch((error) => {
  //     console.error('Error fetching Model List:', error);
  //     // setIsLoading(false);
  //   });
  // };
const navigate = useNavigate();
  const toggleTable = (dirId) => {
    // dir.current = dirId;
    // setDirIds(dirId);
    // console.log("DirIds",dir.current);
 navigate(`/ufLists?directoryId=${dirId}`);

// navigate("/fLists");
  }
  
  // const extractFilesFromFolder = async (item, fileList) => {
  //   if (item.kind === 'file') {
  //     fileList.push(item.getAsFile());
  //   } else if (item.kind === 'folder') {
  //     const directory = item.webkitGetAsEntry();
  //     if (directory.isDirectory) {
  //       const reader = directory.createReader();
  //       reader.readEntries(entries => {
  //         entries.forEach(entry => {
  //           extractFilesFromFolder(entry, fileList);
  //         });
  //       });
  //     }
  //   }
  // };
  
  
  // const [DialogOpen, setDialogOpen] = useState(false);

  // const [dirId, setFId] = useState(false);
  // const DeletehandleClose = () => {
  //   setDialogOpen(false);
  // }
  // const DeleteHandleOpen =(dId) =>{
  //   setFId(dId);
  //   setDialogOpen(true);
  // }
 
  //    const handleDelete = () => {
  //     SuperAdminService.deleteDir(dirId)
  //       .then((response) => {
  //         toast.success("Directory Emptied Successfully");
  //         setDialogOpen(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error Empting Directory:", error);
  //         toast.error("Failed to empty Directory");
  //       });
  //   };

    // const DeleteDialog = (
    //   <Dialog
    //     open={DialogOpen}
    //     onClose={() => setDialogOpen(false)}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
    //     sx={{
    //       zIndex: 999991,
    //       // "& .MuiDialog-paper": {
    //       //   width: 600, // Set the maximum width as per your requirement
    //       // },
    //     }}
    //   >
        
        
          
          
    //       <DialogActions
         
    //     >
    //       <Grid container spacing={1}>
    //         <Grid item xl="12" lg="12" md="12" sm="12" xs="12">
    //         <Box display={"flex"} justifyContent={"space-between"} >
         
    //      <Typography
    //        variant="body2"
    //        // color={colors.redAccent[700]}
    //        fontWeight={"bold"}
    //       paddingTop={1}
    //      >
    //        Do you want to Empty this Directory?
    //      </Typography>
        
        
    //      <IconButton
    //      aria-label="close"
    //      onClick={DeletehandleClose}
        
    //     //  sx={{
    //     //    position: "absolute",
    //     //    right: 8,
    //     //    top: 8,
    //     //    // color: (theme) => theme.palette.grey[500],
    //     //  }}
    //    >
    //      <CloseIcon />
    //    </IconButton>
         
    //      </Box>
    //         </Grid>
    //         <Grid item  xl="12" lg="12" md="12" sm="12" xs="12">
    //         <Box  >
    //       <Button
    //         sx={{
    //           // backgroundColor: colors.blueAccent[600],
    //           // color: colors.grey[100],
    //           fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
    //           fontWeight: "bold",
    //           padding: "5px 10px",
    //           backgroundColor: "#F5A4A0",
    //           color: "black",
    //           boxShadow: 2,
    //           "&:hover": {
    //             // Apply styles on hover
    //             // bgcolor: colors.blueAccent[600], // Change background color
    //             boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
    //           },
    //         }}
    //         onClick={handleDelete}
    //         color="primary"
    //       >
    //         OK
    //       </Button>
    //       </Box>
    //         </Grid>
    //       </Grid>
          
          
    //     </DialogActions>
          
       
       
        
        
    //   </Dialog>
    // );
     const [openModal, setOpenModal] = useState(false);
     const [getVid, setVid] = useState(0);
    
  //    const handleOpenModal = (dirId) => {
  //     setVid(dirId);
  //      setOpenModal(true);
  //    };
   
  //    const handleCloseModal = () => {
  //      setOpenModal(false);
  //    };
   
   
   
  //    const [files, setFiles] = useState([]);
  //   //  const [fileName, setFileName] = useState('');

  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   if (selectedFiles.length) {
  //     setFiles(selectedFiles);
  //   }
  // };
   
  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const items = event.dataTransfer.items;
  //   const fileList = [];

  //   for (let i = 0; i < items.length; i++) {
  //     const item = items[i];
  //     if (item.kind === 'file') {
  //       fileList.push(item.getAsFile());
  //     } else if (item.kind === 'folder') {
  //       extractFilesFromFolder(item, fileList);
  //     }
  //   }

  //   Promise.all(fileList).then(filesArray => {
  //     if (filesArray.length) {
  //       setFiles(filesArray);
  //     }
  //   });
  // };
  
  //   const handleDragOver = (event) => {
  //     event.preventDefault();
  //   };
  
  //   const handleSubmit = () => {
  //     if (!files.length) return;
  
  //     const formData = new FormData();
  //     files.forEach(file => formData.append('files', file));
  //     formData.append('dirId', getVid);
  
  //     SuperAdminService.uploadBulkFiles(formData)
  //       .then(response => {
  //         toast.success("Files Uploaded successfully!");
  //       })
  //       .catch(error => {
  //         console.error('Error uploading files:', error);
  //         toast.error("Failed to upload Files!");
  //       });
      
  //     handleCloseModal();
  //     setFiles([]);
  //   };
   
  //   const handleCancel = () => {
  //     setFiles([]);
  //   };
   
   
   
//      const FileUploadModal = (
//       <Modal
//       open={openModal}
//       onClose={handleCloseModal}
//       aria-labelledby="add-user-modal"
//       aria-describedby="modal-to-add-new-user"
//       sx={{ zIndex: 999991 }}
//     >
//       <Grid
//         container
       
//         sx={{
//           height: "100%",
//           width: "100%",
//           display:"flex",
//           justifyContent: "center",
//           alignItems: "center",
//           overflowY: "auto",
//         }}
//       >
//         <Grid item xs={11} sm={11} md={8} lg={5} xl={5}>
//           <Paper
//             elevation={3}
//             style={{
//               width: "100%",
//               // padding: "20px",
             
//               overflowY: "auto",
//               border: "4px solid #CDF0EA"
//             }}
//           >
//           <Box display={"flex"} justifyContent={"flex-end"}>

//             <IconButton onClick={handleCloseModal}>
// < CloseIcon/>
//             </IconButton>
//           </Box>
              
//           <Box sx={{ padding: "20px" }}>
//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               style={{
//                 border: '2px dashed #cccccc',
//                 borderRadius: '4px',
//                 padding: '20px',
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 marginBottom: '20px',
//                 backgroundImage:{FolderUpload}
//               }}
//             >
//               <img src={FolderUpload} alt="Upload" height={'100vh'} style={{opacity:"0.5"}}/>
//               <p style={{opacity:"0.3"}}>Drag & drop files here, or click to select files</p>
//               <input
//                 type="file"
//                 accept="*/*"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 id="file-input"
//                 multiple
                
//               />
//                   <Box
//                 component="label"
//                 htmlFor="file-input"
//                 sx={{
//                   cursor: 'pointer',
//                   display: 'inline-block',
//                   padding: '10px 20px',
//                   border: '2px solid #cccccc',
//                   borderRadius: '4px',
//                   textAlign: 'center',
//                   transition: 'background-color 0.3s, color 0.3s',
//                   ':hover': {
//                     backgroundColor: '#A4BCDB',
//                     color: 'black'
//                   }
//                 }}
//               >
//                 <b>Select Files</b>
//               </Box>
//             </div>
            
//             <div>
//               <Grid container spacing={0.5}>
//                 <Grid item xs="3" sm="3" md="3" lg="3" xl="3">
//                 <Button onClick={handleSubmit}  sx={{
//                         width:"100%",
//                         marginRight: '10px' ,
//                         fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
//                         fontWeight: "bold",
//                         padding: "10px 20px",
//                         backgroundColor: "#CDF0EA",
//                         color: "black",
//                         boxShadow: 2,
//                         // color:"black",
//                         "&:hover": {
//                           // Apply styles on hover
//                           backgroundColor: "#A4BCDB",
//                           boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
//                         },
//                       }} >
//                 Submit
//               </Button>
//                 </Grid>
//                 <Grid item xs="3" sm="3" md="3" lg="3" xl="3">
//                 <Button sx={{
//                         width:"100%",
//                         // marginRight: '10px' ,
//                         fontSize: {xl:"14px",lg:"13px",md:"12px" ,sm:"11px",xs:"10px"},
//                         fontWeight: "bold",
//                         padding: "10px 20px",
//                         backgroundColor: "#F5A4A0",
//                         color: "black",
//                         boxShadow: 2,
//                         // color:"black",
//                         "&:hover": {
//                           // Apply styles on hover
//                           backgroundColor: "#A4BCDB",
//                           boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
//                         },
//                       }} onClick={handleCancel}>Cancel</Button>
//                 </Grid>
//               </Grid>
              
              
//             </div>
//             <Box sx={{ marginBottom: '20px' }}>
//               {files.length > 0 ? (
//                 <ul>
//                   {files.map((file, index) => (
//                     <li key={index}>{file.name}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No files selected</p>
//               )}
//             </Box>
//           </Box>
            
//           </Paper>
//         </Grid>
//       </Grid>
//     </Modal>
//      );
   
 

  

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
        {/* <Box display={"flex"} justifyContent={"flex-start"}  >
          <Grid container spacing={0.5}>
            <Grid  item xs="5" sm="5" md="5" lg="5" xl="5">
            <Box>
                  <Tooltip title="Delete">
                    <Button
                      size="small"
                      onClick={() => DeleteHandleOpen(param.dirId)}
                    
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
                
                
              </Box> */}
              </Box>
          </Grid>
        </Grid>
        
       
      </Box>
      
{/*      
        {FileUploadModal}
        {DeleteDialog} */}
        <ToastContainer style={{zIndex:9999991}} />
    </Box>
  );
};
export default FolderCard;
