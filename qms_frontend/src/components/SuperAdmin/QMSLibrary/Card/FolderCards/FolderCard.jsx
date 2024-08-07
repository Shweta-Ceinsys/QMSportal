import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./FolderCard.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SuperAdminService from "../../../../../Services/superadmin"
const FolderCard = (props) => {
  const param = props;
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const toggleTable = (Vid) => {
    setOpen(!open);
    SuperAdminService.getFilesByDirId(Vid)
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
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          boxShadow: 2,
          "&:hover": {

          },
        }}
      >
         <Box display="flex"  justifyContent="flex-end" >
          <IconButton onClick={()=>toggleTable(param.Vid)}>
                   <ArrowForwardIcon variant="outlined" sx={{color:"black"}} />
                  
          </IconButton>
          
        </Box>
        <Box className="radialBar" display="flex" flexDirection="column" justifyContent="center"
          alignItems="center">
        
          
          <Box display="flex" sx={{
            // color: colors.grey[100], 
            fontSize: {
              xs: '1rem',
              sm: '0.8rem',
              md: '1rem'
            }
          }} >
            <span><b >{param.name}  </b></span>
          </Box>

        
         
          
          
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} >
                <Box>
                  <Tooltip title="Delete">
                    <Button
                      size="small"
                      // onClick={handleOpenModal}
                    
                      sx={{
                         m: 1,
                         marginTop:8,
                        fontSize: "14px",
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
                <Box>
                  <Tooltip title="Upload ">
                    <Button
                      size="small"
                      // onClick={handleOpenModal}
                    
                      sx={{
                         m: 1,
                         marginTop:8,
                        fontSize: "14px",
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
              </Box>
        
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
    </Box>
  );
};
export default FolderCard;
