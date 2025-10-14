import { useState } from "react";
import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const StudentsManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // States
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock data
  const departments = ["CITE", "CABE", "CAS", "CBTV", "CTE"];
  const courses = {
    CITE: ["BSCS", "BSIT", "BSIS"],
    CABE: ["BSAE", "BSCE"],
    // Add more departments and their courses
  };

  const mockStudents = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      studentId: "2021-00001",
      department: "CITE",
      course: "BSCS",
    },
    // Add more students
  ];

  const handleEditStudent = (studentData) => {
    // Implement edit student logic
    console.log("Editing student:", studentData);
    setOpenEditDialog(false);
  };

  const handleDeleteStudent = (studentId) => {
    // Implement delete student logic
    console.log("Deleting student:", studentId);
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "studentId", headerName: "Student ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" gap={3}>
            <IconButton
              onClick={() => {
                setSelectedStudent(params.row);
                setOpenEditDialog(true);
              }}
              sx={{ color: colors.editGray[500] }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedStudent(params.row);
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
      <Header title="STUDENTS" subtitle="Managing the Students" />

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
      </Box>

      {/* Students DataGrid */}
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
          rows={mockStudents}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>

      {/* Edit Dialog */}
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
        <DialogTitle>Edit Student Profile</DialogTitle>
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
              label="Name"
              defaultValue={selectedStudent?.name}
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
              label="Email"
              defaultValue={selectedStudent?.email}
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
                defaultValue={selectedStudent?.department}
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
            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.logoBlue[200] }}>Course</InputLabel>
              <Select
                defaultValue={selectedStudent?.course}
                sx={{
                  color: colors.logoBlue[100],
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.logoBlue[200],
                  },
                }}
              >
                {courses[selectedStudent?.department || "CITE"]?.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
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
            onClick={() => handleEditStudent(selectedStudent)}
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
          Are you sure you want to delete this student?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteStudent(selectedStudent?.id)}
            sx={{ color: colors.redChart[500] }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsManagement;