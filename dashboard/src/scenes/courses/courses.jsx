import { useState } from "react";
import { Box, Button, Typography, useTheme, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ClassIcon from '@mui/icons-material/Class';
import AddIcon from '@mui/icons-material/Add';
import { mockCourses } from "../../model/mockData";

const Courses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [courses, setCourses] = useState(mockCourses);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: "",
    title: "",
    semester: "",
    students: 0,
    averageGrade: 0,
    attendanceRate: 0,
  });

  const handleViewStudents = (courseId) => {
    console.log("View students for course:", courseId);
    // Implement view students functionality
  };

  const handleViewAnalytics = (courseId) => {
    console.log("View analytics for course:", courseId);
    // Implement analytics functionality
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.title || !newCourse.semester) {
      alert("Please fill in all required fields");
      return;
    }

    const course = {
      id: courses.length + 1,
      ...newCourse,
      students: Number(newCourse.students) || 0,
      averageGrade: Number(newCourse.averageGrade) || 0,
      attendanceRate: Number(newCourse.attendanceRate) || 0,
    };

    setCourses([...courses, course]);
    setShowAddDialog(false);
    setNewCourse({
      code: "",
      title: "",
      semester: "",
      students: 0,
      averageGrade: 0,
      attendanceRate: 0,
    });
  };

  const columns = [
    {
      field: "code",
      headerName: "Course Code",
      flex: 1,
      renderCell: (params) => (
        <Box ml={1}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 2,      
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 1,
    },
    {
      field: "students",
      headerName: "Students",
      align: "left",
      flex: 1,
      display: "flex",
      renderCell: ({ value }) => (
        <Typography color="inherit">{value}</Typography>
      ),
    },
    {
      field: "averageGrade",
      headerName: "Average Grade",
      flex: 1,
      display: "flex",
      renderCell: ({ value }) => (
        <Typography color={value >= 75 ? "#00C54A" : "#DC2626"}>
          {value}% 
        </Typography>
      ),
    },
    {
      field: "attendanceRate",
      headerName: "Attendance Rate",
      display: "flex",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography color={value >= 75 ? "#00C54A" : "#DC2626"}>
          {value}%
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      display: "flex",
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleViewStudents(row.id)} title="View Students">
            <PeopleIcon />
          </IconButton>
          <IconButton onClick={() => handleViewAnalytics(row.id)} title="View Analytics">
            <AnalyticsIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // statistics
  const stats = {
    totalCourses: courses.length,
    averageGrade: Math.round(courses.reduce((acc, course) => acc + course.averageGrade, 0) / courses.length),
    averageAttendance: Math.round(courses.reduce((acc, course) => acc + course.attendanceRate, 0) / courses.length),
    totalStudents: courses.reduce((acc, course) => acc + course.students, 0),
  };

  return (
    <Box m="30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Courses" subtitle="Track performance and engagement by course" fontWeight={500}/>
        {/* <Button
          sx={{
            background: `linear-gradient(90deg, ${colors.logoGreen[400]} 0%, ${colors.logoBlue[400]} 100%)`,
            color: "#263238",
            textTransform: "none",
            fontWeight: "semibold",
            borderRadius: "10px",
            px: 3,
            py: 1,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            "&:hover": {
              background: `linear-gradient(90deg, ${colors.logoGreen[500]} 0%, ${colors.logoBlue[500]} 100%)`,
            },
          }}
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
        >
          Add Course
        </Button> */}
      </Box>
      
      {/* Statistics Cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        mb="20px"
        mt="20px"
      >
        <Box
          bgcolor={colors.blueCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="left"        
        >
          <Typography variant="16px" color="#0284C7" fontWeight={600}>Total Courses</Typography>
          <Typography fontSize="36px" color="#0284C7" fontWeight="bold" mt="20px">{stats.totalCourses}</Typography>
          <Typography fontSize="12px" color="#0284C7" fontWeight="light">This semester</Typography>
        </Box>
        <Box
          bgcolor={colors.greenCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="left"
        >
          <Typography variant="16px" color="#00C54A" fontWeight={600}>Average Grade</Typography>
          <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="20px">{stats.averageGrade}%</Typography>
          <Typography fontSize="12px" color="#00C54A" fontWeight="light">Across all courses</Typography>
        </Box>
        <Box
          bgcolor={colors.orangeCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="left"
        >
          <Typography variant="16px" color="#F59E0B" fontWeight={600}>Average Attendance</Typography>
          <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="20px">{stats.averageAttendance}%</Typography>
          <Typography fontSize="12px" color="#F59E0B" fontWeight="light">This month</Typography>
        </Box>
        <Box
          bgcolor={colors.purpleCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="left"
        >
          <Typography variant="16px" color="#A859FB" fontWeight={600}>Total Students</Typography>
          <Typography fontSize="36px" color="#A859FB" fontWeight="bold" mt="20px">{stats.totalStudents}</Typography>
          <Typography fontSize="12px" color="#A859FB" fontWeight="light">Enrolled students</Typography>
        </Box>
      </Box>

      {/* Course List */}
      <Box
        bgcolor={colors.grayCard[500]}
        p="20px"
        borderRadius="10px"
      >
        <Box display="flex" alignItems="center">
          <ClassIcon sx={{ mr: 1 }} />
          <Typography fontWeight={500}>Course List</Typography>
        </Box>
        <Typography fontSize="12px" mt="5px" mb="20px">Average grades by subject</Typography>
        <Box height="600px" sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <DataGrid
            rows={courses}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.greenCard[500],
                borderBottom: "none",
              },
            }}
          />
        </Box>
      </Box>

      {/* Footer */}
      <Box textAlign="center" mt="20px" pb="20px">
        <Typography variant="body2" color="text.secondary">
          © 2025 GROUP 8. All rights reserved.
        </Typography>
      </Box>

      {/* Add Course Dialog */}
      {/* <Dialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "20px",
            padding: 1,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AddIcon sx={{ fontSize: 20, color: "#000" }} />
          <Typography fontSize={"16px"} fontWeight={500} color="#000" component="span">
            Add New Course
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Course Code"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              fullWidth
              required
              placeholder="e.g., CS101"
            />
            <TextField
              label="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              fullWidth
              required
              placeholder="e.g., Introduction to Computer Science"
            />
            <TextField
              label="Semester"
              value={newCourse.semester}
              onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
              fullWidth
              required
              placeholder="e.g., Fall 2025"
            />
            <TextField
              label="Number of Students"
              type="number"
              value={newCourse.students}
              onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value })}
              fullWidth
              placeholder="0"
            />
            <TextField
              label="Average Grade (%)"
              type="number"
              value={newCourse.averageGrade}
              onChange={(e) => setNewCourse({ ...newCourse, averageGrade: e.target.value })}
              fullWidth
              placeholder="0"
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Attendance Rate (%)"
              type="number"
              value={newCourse.attendanceRate}
              onChange={(e) => setNewCourse({ ...newCourse, attendanceRate: e.target.value })}
              fullWidth
              placeholder="0"
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setShowAddDialog(false)}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "none",
              border: "1px solid #d1d5db",
              "&:hover": { backgroundColor: "#f3f4f6" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddCourse}
            sx={{
              background: `linear-gradient(90deg, ${colors.logoGreen[400]} 0%, ${colors.logoBlue[400]} 100%)`,
              color: "#fff",
              textTransform: "none",
              px: 3,
              "&:hover": {
                background: `linear-gradient(90deg, ${colors.logoGreen[500]} 0%, ${colors.logoBlue[500]} 100%)`,
              },
            }}
          >
            Add Course
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default Courses;