import { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const TeachersManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // States for dialogs
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [openEditCoursesDialog, setOpenEditCoursesDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock data
  const departments = ["CITE", "CABE", "CAS", "CBTV", "CTE"];
  const courses = [
    { code: "CS101", title: "Introduction to Computer Science" },
    { code: "MATH201", title: "Advanced Mathematics" },
    // Add more courses
  ];

  const mockTeachers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "CITE",
      courses: ["CS101", "CS102"],
    },
    // Add more teachers
  ];

  const handleAddTeacher = (teacherData) => {
    // Implement add teacher logic
    console.log("Adding teacher:", teacherData);
    setOpenAddDialog(false);
  };

  const handleEditProfile = (teacherData) => {
    // Implement edit profile logic
    console.log("Editing profile:", teacherData);
    setOpenEditProfileDialog(false);
  };

  const handleEditCourses = (teacherData, selectedCourses) => {
    // Implement edit courses logic
    console.log("Editing courses:", teacherData, selectedCourses);
    setOpenEditCoursesDialog(false);
  };

  const handleDeleteTeacher = (teacherId) => {
    // Implement delete teacher logic
    console.log("Deleting teacher:", teacherId);
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" gap={3}>
            <IconButton
              onClick={() => {
                setSelectedTeacher(params.row);
                setOpenEditProfileDialog(true);
              }}
              sx={{ color: colors.editGray[500] }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedTeacher(params.row);
                setOpenEditCoursesDialog(true);
              }}
              sx={{ color: colors.editGray[500] }}
            >
              <MenuBookIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedTeacher(params.row);
                setOpenDeleteDialog(true);
              }}
              sx={{ color: colors.redChart[500] }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEACHERS" subtitle="Managing the Teachers" />

      <Box display="flex" gap="20px" mt="40px" mb="20px">
        {/* Search Bar */}
        <TextField
          placeholder="Search teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.logoBlue[300] }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              color: colors.blackBackground[100],
              borderRadius: "10px",   
              "& fieldset": { borderColor: colors.logoBlue[500] },
              "&:hover fieldset": { borderColor: colors.logoBlue[300] },
            },
          }}
        />

        {/* dept Filter */}
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            sx={{
              borderRadius: "10px", 
              color: colors.blackBackground[100],
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.logoBlue[500],
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.logoBlue[300],
              },
            }}
          >
            <MenuItem value="all">All Departments</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* add teacher btn */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{
            color: "#fff",
            borderRadius: "10px", 
            bgcolor: colors.logoBlue[400],
            "&:hover": { bgcolor: colors.logoBlue[600] },
          }}
        >
          Add Teacher
        </Button>
      </Box>

      {/* teachers grid */}
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "10px",
            overflow: "hidden",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blackBackground[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.blackBackground[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blackBackground[400],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.logoBlue[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockTeachers}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>

      {/* Add Teacher Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: colors.blackBackground[500],
            color: colors.logoBlue[100],
          },
        }}
      >
        <DialogTitle>Add New Teacher</DialogTitle>
        <DialogContent>
          {/* Add teacher form fields */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleAddTeacher({})}
            sx={{ color: colors.logoBlue[100] }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditProfileDialog}
        onClose={() => setOpenEditProfileDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: colors.blackBackground[500],
            color: colors.logoBlue[100],
          },
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {/* Edit profile form fields */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditProfileDialog(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleEditProfile(selectedTeacher)}
            sx={{ color: colors.logoBlue[100] }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Courses Dialog */}
      <Dialog
        open={openEditCoursesDialog}
        onClose={() => setOpenEditCoursesDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: colors.blackBackground[500],
            color: colors.logoBlue[100],
          },
        }}
      >
        <DialogTitle>Edit Courses</DialogTitle>
        <DialogContent>
          {/* Course selection checkboxes */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditCoursesDialog(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleEditCourses(selectedTeacher, [])}
            sx={{ color: colors.logoBlue[100] }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: colors.blackBackground[500],
            color: colors.logoBlue[100],
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this teacher?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteTeacher(selectedTeacher?.id)}
            sx={{ color: colors.redCard[500] }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeachersManagement;