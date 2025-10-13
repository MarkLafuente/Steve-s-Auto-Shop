import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Tabs,
  Tab
} from "@mui/material";
import { mockData } from "../../model/mockData";
import Papa from "papaparse";
import Header from "../../components/header";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ErrorIcon from "@mui/icons-material/Error";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { tokens } from "../../theme";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const [showImportDialog, setShowImportDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [validationMessage, setValidationMessage] = useState(null);
    const [activeTab, setActiveTab] = useState("grades");

    // required columns
    const requiredHeadersGrades = [        
    "Course Code", 
    "Block",
    "Student Number", 
    "Student Name", 
    "Grade"
    ];
  const requiredHeadersAttendance = [
    "Course Code", 
    "Block",
    "Student Number",
    "Student Name",
    "Date",
    "Status",
  ];
  const currentHeaders =
    activeTab === "grades" ? requiredHeadersGrades : requiredHeadersAttendance;

  const handleFileSelect = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
  setValidationMessage(null);

  if (file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = (results.meta.fields || []).map(h => h.trim());
        const currentHeaders =
          activeTab === "grades"
            ? requiredHeadersGrades
            : requiredHeadersAttendance;

        // Case-insensitive comparison
        const headersLower = headers.map(h => h.toLowerCase());
        const requiredLower = currentHeaders.map(h => h.toLowerCase());
        
        const missing = currentHeaders.filter((h, i) => 
          !headersLower.includes(requiredLower[i])
        );

        if (missing.length > 0) {
          setValidationMessage(`❌ Missing required headers: ${missing.join(", ")}`);
        } else if (results.data.length === 0) {
          setValidationMessage("⚠️ File is empty. Please add data rows.");
        } else {
          setValidationMessage(`✅ File validated successfully! Found ${results.data.length} rows.`);
        }
      },
      error: (err) => {
        setValidationMessage(`❌ Parsing error: ${err.message}`);
      },
    });
  }
};


  const handleImport = () => {
    if (!selectedFile) {
      setValidationMessage("⚠️ Please select a file first.");
      return;
    }
    if (validationMessage && !validationMessage.startsWith("✅")) {
      setValidationMessage("⚠️ Fix validation issues before importing.");
      return;
    }

    console.log("📤 Importing:", selectedFile.name);
    //send parsed data to backend API here (fetch/axios)

    setShowImportDialog(false);
    setSelectedFile(null);
    setValidationMessage(null);
  };

  const handleExport = () => {
    const headers = ["Subject", "Average Grade"];
    const rows = mockData.subjectGrades.labels.map((subject, index) => [
      subject,
      mockData.subjectGrades.data[index],
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "dashboard_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box m="30px">
      <Box display="flex" justifyContent="space-between" alignItems="left">
        <Header title="Dashboard" subtitle="Manage and monitor student performance" />
        <Box>
          <Button
            sx={{
              mr: 2,
              background: `linear-gradient(90deg, ${colors.logoGreen[400]}  0%, ${colors.logoBlue[400]} 100%)`,
              color: "#263238",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "10px",
              px: 3,
              py: 1,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              "&:hover": {
                background: `linear-gradient(90deg, ${colors.logoGreen[500]} 0%, ${colors.logoBlue[500]} 100%)`,
              },
            }}
            startIcon={<UploadIcon />}
            onClick={() => setShowImportDialog(true)}
          >
            Import Data
          </Button>

          <Button
            sx={{
              mr: 2,
              background: "#fff",
              color: "#263238",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "10px",
              px: 3,
              py: 1,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              "&:hover": { background: "#e6e6e6ff" },
            }}
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* import dialog */}
      <Dialog 
        open={showImportDialog} 
        onClose={() => setShowImportDialog(false)} 
        fullWidth maxWidth="sm"
        PaperProps={{
        sx: {
        backgroundColor: "#fff", 
        color: "#000",              
        borderRadius: "10px",       
        padding: 1,                
    },
  }}
    >
    <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <UploadIcon sx={{ fontSize: 20, color: "#000" }} />
        <Typography fontSize={"16px"} fontWeight={500} color= "#000"  component="span">
            Import Student Data
        </Typography>
    </DialogTitle>
    <Typography fontSize={"12px"} mx={3} color="#000">
        Upload CSV or Excel files to import {activeTab} data
    </Typography>

    <DialogContent>
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, val) => {
          setActiveTab(val);
          setSelectedFile(null);
          setValidationMessage(null);
        }}
        centered
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          mb: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: "30px",
          width: "fit-content",
          mx: "auto",
          p: "4px",
        }}
      >
        <Tab
          value="grades"
          label="Grades"
          sx={{
            textTransform: "none",
            color: activeTab === "grades" ? "#000" : "#555",
            fontWeight: 600,
            backgroundColor: activeTab === "grades" ? "#fff" : "transparent",
            borderRadius: "30px",
            boxShadow: activeTab === "grades" ? "0px 2px 6px rgba(0,0,0,0.1)" : "none",
            px: 4,
            py: 1,
            minWidth: "120px",
            "&.Mui-selected": {
              color:  `${colors.logoBlue[600]} !important`,
              opacity: 1,
            },
            "&:hover": {
              backgroundColor: activeTab === "grades" ? "#fff" : "#eaeaea",
            },
          }}
        />
        <Tab
          value="attendance"
          label="Attendance"
          sx={{
            textTransform: "none",
            color: activeTab === "attendance" ? "#000" : "#555",
            fontWeight: 600,
            backgroundColor: activeTab === "attendance" ? "#fff" : "transparent",
            borderRadius: "30px",
            boxShadow: activeTab === "attendance" ? "0px 2px 6px rgba(0,0,0,0.1)" : "none",
            px: 4,
            py: 1,
            "&.Mui-selected": {
              color: colors.logoBlue[600],
              opacity: 1,
            },
            minWidth: "120px",
            "&:hover": {
              backgroundColor: activeTab === "attendance" ? "#fff" : "#eaeaea",
            },
          }}
        />
      </Tabs>

    {/* upload box */}
    <Box
      sx={{
        border: "2px dashed #cbd5e1",
        borderRadius: "12px",
        textAlign: "center",
        p: 4,
        mb: 3,
        backgroundColor: "#fafafa",
      }}
    >
      <FileUploadIcon sx={{ fontSize: 48, color: "#94a3b8", mb: 1 }} />
      <Typography fontWeight={600} color="#000" mb={1}>
        Upload {activeTab === "grades" ? "Grades" : "Attendance"} File
      </Typography>

      {/* Hidden Input */}
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <label htmlFor="file-upload">
        <Button
          variant="outlined"
          component="span"
          sx={{
            textTransform: "none",
            borderColor: "#cbd5e1",
            color: "#000",
            mb: 1,
            "&:hover": {
              backgroundColor: "#f1f5f9",
              borderColor: "#94a3b8",
            },
          }}
        >
          Choose File
        </Button>
      </label>

      <Typography variant="body2" color="#6b7280">
        Supported formats: CSV, Excel (.xlsx, .xls)
      </Typography>

      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          📄 Selected file: <strong>{selectedFile.name}</strong>
        </Typography>
      )}

      {validationMessage && (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: validationMessage.startsWith("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {validationMessage}
        </Typography>
      )}
    </Box>

  {/* Required Columns Box */}
  <Box
    sx={{
      backgroundColor: "#E0F2FE",
      p: 2.5,
      borderRadius: "12px",
      mt: 2,
    }}
  >
    <Typography fontWeight={600} mb={1} fontSize="14px" color="#000">
      Required Columns for {activeTab === "grades" ? "Grades" : "Attendance"}:
    </Typography>
    {currentHeaders.map((header) => (
      <Typography key={header} variant="body2" color="#000">
        • {header}
      </Typography>
    ))}

    <Button
    variant="contained"
    sx={{
      borderRadius: "10px",
      mt: 3,
      color:"#fff",
      backgroundColor: colors.logoBlue[500],
      '&:hover': {
        backgroundColor: colors.logoBlue[600],
      },
    }}
    href={activeTab === "grades" ? "/grades.xlsx" : "/attendance.xlsx"}
    download={activeTab === "grades" ? "Grades.xlsx" : "Attendance.xlsx"}
  >
    Download {activeTab === "grades" ? "Grades" : "Attendance"} Template
  </Button>
  </Box>
</DialogContent>

{/* Footer Buttons */}
<DialogActions sx={{ px: 3, pb: 2 }}>
  <Button
    variant="contained"
    onClick={() => setShowImportDialog(false)}
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
    onClick={handleImport}
    sx={{
      background: `linear-gradient(90deg, ${colors.logoGreen[400]}  0%, ${colors.logoBlue[400]} 100%)`,
      color: "#fff",
      textTransform: "none",
      px: 3,
      "&:hover": {
        background: `linear-gradient(90deg, ${colors.logoGreen[500]}  0%, ${colors.logoBlue[500]} 100%)`,
      },
    }}
  >
    Upload
  </Button>
</DialogActions>

      </Dialog>
      {/* stats Cards */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px" my="20px">
        <Box bgcolor={colors.blueCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <Typography color="#0284C7" fontWeight={600}>
            Total Students
          </Typography>
          <Typography fontSize="36px" color="#0284C7" fontWeight="bold" mt="20px">
            {mockData.totalStudents}
          </Typography>
          <Typography fontSize="12px" color="#0284C7">
            Active this semester
          </Typography>
        </Box>
        <Box bgcolor={colors.greenCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <Typography color="#00C54A" fontWeight={600}>
            Average GPA
          </Typography>
          <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="20px">
            {mockData.averageGPA}
          </Typography>
          <Typography fontSize="12px" color="#00C54A">
            ___ from last semester
          </Typography>
        </Box>
        <Box bgcolor={colors.orangeCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <Typography color="#F59E0B" fontWeight={600}>
            Attendance Rate
          </Typography>
          <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="20px">
            {mockData.attendanceRate}%
          </Typography>
          <Typography fontSize="12px" color="#F59E0B">
            This month
          </Typography>
        </Box>
        <Box bgcolor={colors.redCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <Typography color="#DC2626" fontWeight={600}>
            At-Risk Students
          </Typography>
          <Typography fontSize="36px" color="#DC2626" fontWeight="bold" mt="20px">
            {mockData.atRiskStudents}
          </Typography>
          <Typography fontSize="12px" color="#DC2626">
            Need attention
          </Typography>
        </Box>
      </Box>

      {/* class Performance */}
      <Box bgcolor={colors.grayCard[500]} p="20px" borderRadius="10px" mb="20px">
        <Box display="flex" alignItems="center" mb="5px">
          <LeaderboardIcon sx={{ mr: 1 }} />
          <Typography fontWeight={500}>Class Performance Overview</Typography>
        </Box>
        <Typography fontSize="12px" mb="10px">
          Average grades by subject
        </Typography>

        <Box height="300px">
          <Bar
            data={{
              labels: mockData.subjectGrades.labels,
              datasets: [
                {
                  label: "Average Grade",
                  data: mockData.subjectGrades.data,
                  backgroundColor: colors.blueChart[500],
                  borderRadius: 10,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: true, max: 100 } },
            }}
          />
        </Box>
      </Box>

      {/* bottom Section */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="20px" mb="20px">
        <Box bgcolor={colors.grayCard[500]} p="20px" borderRadius="10px">
          <Box display="flex" alignItems="center" mb="20px">
            <ErrorIcon sx={{ mr: 1, color: "#DC2626" }} />
            <Typography fontWeight={500}>Top 5 At-Risk Students</Typography>
          </Box>
          {mockData.atRiskList.map((student) => (
            <Box key={student.id} mb="10px" p="10px" backgroundColor={colors.redCard[500]} borderRadius="10px">
              <Typography>{student.name}</Typography>
              <Typography variant="body2">
                {student.risk}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* <Box bgcolor={colors.grayCard[500]} p="20px" borderRadius="10px">
          <Typography mb="20px" fontWeight={500}>
            Grade Distribution
          </Typography>
          <Box height="300px">
            <Pie
              data={{
                labels: mockData.gradeDistribution.labels,
                datasets: [
                  {
                    data: mockData.gradeDistribution.data,
                    backgroundColor: [
                      colors.orangeChart[500],
                      colors.blueChart[500],
                      colors.purpleChart[500],
                      colors.greenChart[500],
                      colors.redChart[500],
                    ],
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Box>
        </Box> */}
      </Box>

      <Box textAlign="center" pb="20px">
        <Typography variant="body2" color="text.secondary">
          © 2025 GROUP 8. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
