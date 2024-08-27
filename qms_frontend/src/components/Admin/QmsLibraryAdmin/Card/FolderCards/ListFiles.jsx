import { ToastContainer, toast } from "react-toastify";
import Topbar from "../../../Topbar";
import { Box, Button, Dialog, DialogActions,  Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SuperAdminService from "../../../../../Services/superadmin";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../../DataContext";
const ListFiles =(props) =>{
    const [rows, setRows] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    //  const dirId = queryParams.get('directoryId');
    const { setDirId } = useContext(DataContext);
    const { dirId } = useContext(DataContext);
     useEffect(() => {
      // Fetch files based on directory ID
      const storedId = sessionStorage.getItem('directoryId');
      setDirId(storedId);
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
  }, [dirId]);
      
  let navigate = useNavigate();
  const  handleNavigate =()=>{
    // navigate(`/fCards?versionId=${id}`);
    // setData({ id, version });
    navigate(`/afCards`);
    // navigate(`/fCards?versionId=${id}&versionName=${version}`);
   }
   const handleDownload = (id) => {
    SuperAdminService.downloadFile(id)
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
  // const handleDownload = (id) => {
  //   SuperAdminService.downloadFile(id)
  //   .then(response => { 

  //     const headers = response.headers; 
  
  //     return response.blob().then(blob => { 
  
  //       const filename = headers.get('Content-Disposition').split(';')[1].trim().split('=')[1]; 
  
  //       const link = document.createElement('a'); 
  
  //       link.href = window.URL.createObjectURL(blob); 
  
  //       link.download = filename; 
  
  //       link.click(); 
  
  //     }); 
  
  //   }) 
    
  //       .catch((error) => {
  //           toast.error("File download failed");
  //           console.error('Error downloading file:', error);
  //       });
// };
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
       Do you want to Delete this File?
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
    const columns = [
      {
        field: 'serialNumber',
        headerName: 'Sr. No.',
        width: 150,
        // valueGetter: (params) => params.api.getRowIndex(params.row.id) + 1,
    },
        //  { field: "id", headerName: "ID", width: 100 },
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
    return(


        <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
        <main className="content">
          <Topbar />
          <Box  >
          <Box marginTop={"100px"}>
        <Tooltip title="Back">
          <IconButton 
          // href="/aQmsLibrary"
           onClick={ handleNavigate}
          >
                   <ArrowBackOutlinedIcon variant="outlined" sx={{color:"black"}} />
                  
          </IconButton>
          </Tooltip>
          </Box>
          <Paper elevation={2} sx={{ margin: "1%", marginTop: '10px' }}>
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
            <Box style={{ height: `calc(100vh - 160px)`,  }}
            >
          <DataGrid
            rows={rows}
            columns={columns}
            stickyHeader
          />
        </Box>
        </Box>
        </Paper>
        
          </Box>
 
        </main>
        {DeleteDialog}
        <ToastContainer style={{ zIndex: "1000000" }} />
      </div>
    );


}

export default ListFiles;
