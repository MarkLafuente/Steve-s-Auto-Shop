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
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const CoursesManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // States
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock data
  const departments = ["CITE", "CABE", "CAS", "CBTV", "CTE"];
  const mockCourses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      code: "CS101",
      department: "CITE",
      teacherCount: 3,
    },
    // Add more courses
  ];

  const handleAddCourse = (courseData) => {
    // Implement add course logic
    console.log("Adding course:", courseData);
    setOpenAddDialog(false);
  };

  const handleEditCourse = (courseData) => {
    // Implement edit course logic
    console.log("Editing course:", courseData);
    setOpenEditDialog(false);
  };

  const handleDeleteCourse = (courseId) => {
    // Implement delete course logic
    console.log("Deleting course:", courseId);
    setOpenDeleteDialog(false);
  };

  const columns = [
    { 
      field: "code", 
      headerName: "Course Code", 
      flex: 1 
    },
    { 
      field: "name", 
      headerName: "Course Name", 
      flex: 2 
    },
    { 
      field: "department", 
      headerName: "Department", 
      flex: 1 
    },
    {
      field: "teacherCount",
      headerName: "Teachers",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.logoBlue[100]}>
          {params.value} {params.value === 1 ? "teacher" : "teachers"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" gap={3}>
            <IconButton
              onClick={() => {
                setSelectedCourse(params.row);
                setOpenEditDialog(true);
              }}
              sx={{ color: colors.editGray[500] }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedCourse(params.row);
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
      <Header title="COURSES" subtitle="Managing the Courses" />

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

        {/* Add Course Button */}
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
          Add Course
        </Button>
      </Box>

      {/* Courses DataGrid */}
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "10px",
            overflow: "hidden"
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
          rows={mockCourses}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>

      {/* Add Course Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            bgcolor: colors.blackBackground[500],
            color: colors.logoBlue[500],
            "& .MuiDialogTitle-root": {
              fontSize: "20px",
              fontWeight: 600,
            },
            "& .MuiDialogContent-root": {
              fontSize: "12px",
            },
            "& .MuiDialogActions-root": {
              fontSize: "14px",
            },
          },
        }}
      >
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
              minWidth: "400px",
            }}
          >
            <TextField
              label="Course Code"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": { borderColor: colors.logoBlue[500] },
                },
                "& .MuiInputLabel-root": { color: colors.logoBlue[500] },
              }}
            />
            <TextField
              label="Course Name"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": { borderColor: colors.logoBlue[500] },
                },
                "& .MuiInputLabel-root": { color: colors.logoBlue[500] },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.logoBlue[500] }}>
                Department
              </InputLabel>
              <Select
                sx={{
                  color: colors.logoBlue[500],
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.logoBlue[500],
                  },
                }}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleAddCourse({})}
            sx={{ color: colors.logoBlue[500] }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: colors.blackBackground[500],
            color: colors.logoBlue[100],
          },
        }}
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
              minWidth: "400px",
            }}
          >
            <TextField
              label="Course Code"
              defaultValue={selectedCourse?.code}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": { borderColor: colors.logoBlue[200] },
                },
                "& .MuiInputLabel-root": { color: colors.logoBlue[200] },
              }}
            />
            <TextField
              label="Course Name"
              defaultValue={selectedCourse?.name}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": { borderColor: colors.logoBlue[200] },
                },
                "& .MuiInputLabel-root": { color: colors.logoBlue[200] },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.logoBlue[200] }}>
                Department
              </InputLabel>
              <Select
                defaultValue={selectedCourse?.department}
                sx={{
                  color: colors.logoBlue[100],
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.logoBlue[200],
                  },
                }}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleEditCourse(selectedCourse)}
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
          Are you sure you want to delete this course?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteCourse(selectedCourse?.id)}
            sx={{ color: colors.redChart[500] }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesManagement;