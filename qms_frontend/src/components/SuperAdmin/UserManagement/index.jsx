import {
  Box,
  Fab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CarCrashOutlinedIcon from "@mui/icons-material/CarCrashOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import Topbar from "../Topbar";
import Tooltip from "@mui/material/Tooltip";
import SuperAdminService from "../../../Services/superadmin";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
const UserManagment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // =====================================================================Code For Add User Form==========================================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user.name.trim().length === 0) {
        toast.warning("Please Enter  Name!");
      } else if (user.email.trim().length === 0) {
        toast.warning("Please Enter Email!");
      } else if (user.password.trim().length === 0) {
        toast.warning("Please Enter Password!");
      } else {
        const response = SuperAdminService.addUser(user);
        toast.success("User added successfully!");

        setUser({
          name: "",
          email: "",
          password: "",
          role: "",
        });

        handleCloseModal();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user!");
    }
  };

  // ============================================================================Code For  Add User Component===============================================================

  const AddUserModal = (
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
              border: "4px solid #CDF0EA"
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
                  boxShadow: 5
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
                  <span>Add User</span>
                </Box>
                <Box>
                  <IconButton
                    sx={{ color: "#1C1678", padding: "20px", }}
                    onClick={handleCloseModal}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: "20px", }}>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  required
                  value={user.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"

                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  required
                  value={user.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    required
                    value={user.role}
                    onChange={handleChange}
                    label="Role"
                    MenuProps={{ style: { zIndex: 999991 } }}
                  >
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                 
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor:"#CDF0EA",
                    color:"black",
                    "&:hover": {
                      // Apply styles on hover
                      backgroundColor:"#A4BCDB",
                      boxShadow:
                        "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
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

  // ============================================================================Columns, Rows,Filter or search code for User Detials Table==================================================

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ value: role }) => {
        let icon = null;
        let backgroundColor = null;

        // switch (role) {
        //   case "SUPER_ADMIN":
        //     icon = (
        //       <AdminPanelSettingsOutlinedIcon
        //         sx={{
        //           color: "black",
        //           fontSize: {
        //             xl: "1.1rem",
        //             xs: "0.8rem",
        //             sm: "0.9rem",
        //             md: "1rem",
        //           },
        //         }}
        //       />
        //     );
        //     // backgroundColor = "#ffcdd2";
        //     break;
        //   case "ADMIN":
        //     icon = (
        //       <ContactsOutlinedIcon
        //         sx={{
        //           color: "black",
        //           fontSize: {
        //             xl: "1.1rem",
        //             xs: "0.8rem",
        //             sm: "0.9rem",
        //             md: "1rem",
        //           },
        //         }}
        //       />
        //     );
        //     // backgroundColor = "#f0f4c3";
        //     break;
        //   case "USER":
        //     icon = (
        //       <CarCrashOutlinedIcon
        //         sx={{
        //           color: "black",
        //           fontSize: {
        //             xl: "1.1rem",
        //             xs: "0.8rem",
        //             sm: "0.9rem",
        //             md: "1rem",
        //           },
        //         }}
        //       />
        //     );
        //     // backgroundColor = "#e1bee7";
        //     break;
        //   default:
        //     icon = (
        //       <PersonOutlinedIcon
        //         sx={{
        //           color: "black",
        //           fontSize: {
        //             xl: "1.1rem",
        //             xs: "0.8rem",
        //             sm: "0.9rem",
        //             md: "1rem",
        //           },
        //         }}
        //       />
        //     );
        //     // backgroundColor = "#b2dfdb";
        //     break;
        // }

        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            backgroundColor={backgroundColor}
            borderRadius="4px"
          >
            {/* {icon}
            <Typography
              fontSize={"10px"}
              sx={{
                fontSize: {
                  xl: "3rem",
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1rem",
                },
              }}
            >
              {role}
            </Typography> */}
            <span> {role}</span>
          </Box>
        );
      },
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
            icon={<EditIcon variant="outlined" color="primary" size="small" />}
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

  useEffect(() => {
    SuperAdminService.getAllUsers()
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [openModal]);

  //const filteredRows = filterRole === 'All' ? rows : rows.filter(row => row.role === filterRole);
  const filteredRows = rows.filter((row) => {
    if (filterRole !== "All" && row.role !== filterRole) {
      return false;
    }
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

  const handleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // =====> Edit Code Satrt Here=====>//

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleEdit = (id) => {
    const selectedUser = rows.find((user) => user.id === id);

    // Update the user state with the selected user's details
    setEditUser(selectedUser);

    // Open the edit modal
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // ============================================================================ Code For Editing Form=============================================

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editUser.name.trim().length === 0) {
        toast.warning("Please Enter  Name!");
      } else if (editUser.email.trim().length === 0) {
        toast.warning("Please Enter Email!");
      } else {
        const response = SuperAdminService.modifyUser(editUser);
        toast.success("User Updated successfully!");

        setUser({
          id: "",
          name: "",
          email: "",

          role: "",
        });

        handleCloseEditModal();
      }
    } catch (error) {
      console.error("Error Updating user:", error);
      toast.error("Failed to Update user details!");
    }
  };

  // ============================================================================Code For  Edit User Component===============================================================

  const EditUserModal = (
    <Modal
      open={openEditModal}
      onClose={handleCloseEditModal}
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
              border: "4px solid #CDF0EA",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
            }}
          >
            {/* <Button onClick={handleCloseEditModal} sx={{ mt: 1, color: theme.palette.primary.contrastText, bgcolor: colors.blueAccent[600],
                    '&:hover': { // Apply styles on hover
                      bgcolor: colors.blueAccent[600], // Change background color
                      boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.5)' // Apply box shadow
                    },
                    margin: '0 auto' // Center the button horizontally
                  }}>
               Close
          </Button> */}
            <Box
              component="form"
              noValidate
              onSubmit={handleEditSubmit}
              sx={{ alignItems: "center" }}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                sx={{
                  backgroundColor: "#CDF0EA",
                  boxShadow: 5
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
                  <span>Edit User</span>
                </Box>
                <Box>
                  <IconButton onClick={handleCloseEditModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: "20px", }}>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  required
                  value={editUser.name}
                  onChange={handleChanges}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  required
                  value={editUser.email}
                  onChange={handleChanges}
                  fullWidth
                  margin="normal"
                />
                {/* <TextField
                label="UserName"
                type="text"
                name="username"
                required
                value={editUser.username}
                onChange={handleChanges}
                fullWidth
                margin="normal"
                disabled
              /> */}
                {/* <TextField
              label="Password"
              type="password"
              name="password" required
              value={editUser.password}
              onChange={handleChanges}
              fullWidth
              margin="normal"
           /> */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    required
                    value={editUser.role}
                    onChange={handleChanges}
                    label="Role"
                    MenuProps={{ style: { zIndex: 999991 } }}
                  >
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={handleEditSubmit}
                  type="submit"
                  
                  color="primary"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor:"#CDF0EA",
                    color:"black",

                    "&:hover": {
                      // Apply styles on hover
                      backgroundColor:"#A4BCDB",
                      boxShadow:
                        "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                    },
                    margin: "0 auto", // Center the button horizontally
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            {/* <ToastContainer /> */}
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );

  // ============================= code for Delete the Modal===================================================
  const handleDelete = (id) => {
    SuperAdminService.deleteUser(id)
      .then((response) => {
        toast.success("User Deleted Successfully");
        SuperAdminService.getAllUsers().then((response) => {
          setRows(response.data);
        });
      })
      .catch((error) => {
        console.error("Error deleting User:", error);
        toast.error("Failed to Delete User");
      });
  };

  return (
    <div className="app" style={{ backgroundColor: '#EEF0F6', }}>
      <main className="content">
        <Topbar />
        <Box paddingTop={"130px"}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          ></Box>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Paper elevation={2} sx={{ margin: "1%", marginTop: 0 }}>
                <Box
                  sx={{
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
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Box>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 100 }}
                      >
                        <Typography sx={{ mr: 1 }}>Role:</Typography>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Role"
                          value={filterRole}
                          onChange={handleFilterChange}
                          sx={{
                            ml: 1,
                            minWidth: "120px",
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
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="USER">USER</MenuItem>
                          <MenuItem value="ADMIN">ADMIN</MenuItem>
                          <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
                        </Select>
                      </FormControl>

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
                    <Box>
                      <Tooltip title="Add user">
                        <Button
                          
                         
                          size="small"
                          onClick={handleOpenModal}
                          startIcon={<PersonAddAltOutlinedIcon  color="black"/>}
                          sx={{
                            m: 1,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            backgroundColor:"#CDF0EA",
                            color:"black",
                            boxShadow:4,
                            // color:"black",
                            "&:hover": {
                              // Apply styles on hover
                              backgroundColor:"#A4BCDB",
                              boxShadow:
                                "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                            },
                           
                          }}
                        >
                          ADD USER
                        </Button>

                      </Tooltip>
                    </Box>
                  </Box>

                  <Box
                    style={{
                      height: `calc(100vh - 300px)`,

                      padding: "1%",
                    }}
                  >
                    <DataGrid
                      rows={filteredRows}
                      columns={columns}
                      stickyHeader
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {AddUserModal}
        {EditUserModal}
      </main>
      <ToastContainer style={{ zIndex: "1000000" }} />
    </div>
  );
};

export default UserManagment;
