import { ToastContainer, toast } from "react-toastify";
import Topbar from "../../../Topbar";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";


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
      setDirId(storedId)
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

  let navigate = useNavigate();
  const  handleNavigate =()=>{
    // navigate(`/fCards?versionId=${id}`);
    // setData({ id, version });
    navigate(`/ufCards`);
    // navigate(`/fCards?versionId=${id}&versionName=${version}`);
   }
 
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
              // <GridActionsCellItem
              //   icon={
              //     <DeleteIcon variant="outlined" color="secondary" size="small" />
              //   }
              //   label="Delete"
              //    onClick={() => DeleteHandleOpen(row.id)}
              //   color="inherit"
              // />,
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
          // href="/uQmsLibrary"
          onClick={handleNavigate}
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
        {/* {DeleteDialog} */}
        <ToastContainer style={{ zIndex: "1000000" }} />
      </div>
    );


}

export default ListFiles;
