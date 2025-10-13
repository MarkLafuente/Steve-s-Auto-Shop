import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockAssessments = [
  {
    id: 1,
    title: "Midterm Exam",
    course: "CS101",
    totalScore: 100,
    averageScore: 85,
    submissions: 32,
  },
];



const Assessments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleUpload = (assessmentId) => {
    console.log("Upload scores for assessment:", assessmentId);
    // implement upload functionality
  };

  const handleViewAnalytics = (assessmentId) => {
    console.log("View analytics for assessment:", assessmentId);
    // implement analytics functionality
  };
  const mockPerformanceData = {
  labels: ['CS101', 'CS102', 'CS103', 'CS104', 'CS105'],
  datasets: [
    {
      label: 'Average Score',
      data: [85, 78, 92, 88, 76],
      backgroundColor: [colors.blueChart[500]],
      borderRadius: 10,
    }
  ],
};

  const columns = [
    {
      field: "title",
      headerName: "Assessment Title",
      flex: 2,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "totalScore",
      headerName: "Total Score",
      flex: 1,
    },
    {
      field: "averageScore",
      headerName: "Average Score",
      display: "flex",
      flex: 1,
      renderCell: ({ value, row }) => {
        const percentage = (value / row.totalScore) * 100;
        return (
          <Typography color={percentage >= 75 ? "#00C54A" : "#DC2626"}>
            {value} ({percentage.toFixed(1)}%)
          </Typography>
        );
      },
    },
    {
      field: "submissions",
      headerName: "Submissions",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      display: "flex",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleUpload(row.id)} title="Upload Scores">
            <UploadFileIcon />
          </IconButton>
          <IconButton onClick={() => handleViewAnalytics(row.id)} title="View Analytics">
            <AssessmentIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Calculate statistics
  const stats = {
    totalAssessments: mockAssessments.length,
    averageScore: Math.round(mockAssessments.reduce((acc, assessment) => 
      acc + (assessment.averageScore / assessment.totalScore) * 100, 0) / mockAssessments.length),
    totalSubmissions: mockAssessments.reduce((acc, assessment) => acc + assessment.submissions, 0),
    completionRate: 95, // This should be calculated based on actual data
  };

  return (
    <Box m="30px">
      <Header title="Assessments" subtitle="Track and analyze student assessments" />
      
      {/* Statistics Cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        mb="20px"
        mt="40px"
      >
        <Box
        bgcolor={colors.blueCard[500]}
        p="20px"
        borderRadius="10px"
        textAlign="left"
        >
            <Typography variant="16px" color= "#0284C7" fontWeight={600}> Total Assessments</Typography>
            <Typography fontSize="36px" color= "#0284C7" fontWeight="bold"  mt="20px">{stats.totalAssessments}</Typography>
            <Typography fontSize="12px" color= "#0284C7" fontWeight="light">This semester</Typography>
        </Box>
        <Box
        bgcolor={colors.greenCard[500]}
        p="20px"
        borderRadius="10px"
        textAlign="left"
        >
            <Typography variant="16px" color="#00C54A" fontWeight={600}>Average Score</Typography>
            <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="20px">{stats.averageScore}%</Typography>
            <Typography fontSize="12px" color= "#00C54A" fontWeight="light">Across selected assessments</Typography>
        </Box>
        <Box
        bgcolor={colors.orangeCard[500]}
        p="20px"
        borderRadius="10px"
        textAlign="left"
        >
            <Typography fontSize="16px" color="#F59E0B" fontWeight={600}>Submissions</Typography>
            <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="20px">{stats.totalSubmissions}</Typography>
            <Typography fontSize="12px" color= "#F59E0B" fontWeight="light">Total submissions</Typography>
        </Box>
        <Box
            bgcolor={colors.purpleCard[500]}
            p="20px"
            borderRadius="10px"
            textAlign="left"
        >
            <Typography variant="16px" color="#A859FB" fontWeight={600}>Completion Rate</Typography>
            <Typography fontSize="36px" color="#A859FB" fontWeight="bold" mt="20px">{stats.completionRate}%</Typography>
            <Typography fontSize="12px" color= "#A859FB" fontWeight="light">On-time submissions</Typography>

        </Box>
      </Box>

      {/* Performance Comparison Chart */}
      <Box
        bgcolor={colors.grayCard[500]}
        p="20px"
        borderRadius="10px"
        mb="20px"
      >
        <Box display="flex" alignItems="center" mb={"5px"}>
          <AssessmentIcon sx={{ mr: 1 }} />
          <Typography fontWeight={600}>Assessments Performance Comparison</Typography>
        </Box>
        <Typography fontSize="12px" fontWeight="lighter" mb={"10px"}>Average scores across assessments</Typography>

        <Box height="300px">
          <Bar
            data={mockPerformanceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
          
        </Box>
      </Box>

      {/* Assessments List */}
      <Box
        bgcolor={colors.grayCard[500]}
        p="20px"
        borderRadius="10px"
      >
        <Box display="flex" alignItems="center" mb={2} >
          <Typography fontWeight={600}>Assessments List</Typography>
        </Box>
        <Box height="400px" sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <DataGrid
            rows={mockAssessments}
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
                backgroundColor: colors.grayCard[500],
                borderBottom: "none",
              },
              // "& .MuiDataGrid-virtualScroller": {
                // backgroundColor: colors.grayCard[500],
              // },
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
    </Box>
  );
};

export default Assessments;