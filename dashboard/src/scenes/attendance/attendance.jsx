import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Bar, Line } from "react-chartjs-2";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


const mockAttendanceRecords = [
  {
    id: 1,
    date: "2025-10-01",
    course: "CS101",
    student: "John Doe",
    status: "Present",
    time: "07:30 AM",
  },
  {
    id: 2,
    date: "2025-10-02",
    course: "CS102",
    student: "Jessica Smith",
    status: "Absent",
    time: "07:30 AM",
  },
  {
    id: 3,
    date: "2025-10-02",
    course: "CS102",
    student: "Alan Green",
    status: "Late",
    time: "08:32 AM",
  },
  {
    id: 4,
    date: "2025-10-03",
    course: "CS101",
    student: "Victoria Catabay",
    status: "Late",
    time: "07:44 AM",
  },
];

const Attendance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mockAttendanceData = {
  weeklyData: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Attendance Rate',
        data: [95, 88, 92, 85, 90],
        backgroundColor: colors.blueChart[500],
        borderRadius: 10,
      }
    ],
  },
  monthlyData: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance Rate',
        data: [90, 87, 93, 89],
        borderColor: colors.blueChart[500],
        tension: 0.1,
      }
    ],
  },
};

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return "#00C54A";
      case 'absent':
        return "#DC2626";
      case 'late':
        return "#F59E0B";
      default:
        return "#00C54A";
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "student",
      headerName: "Student",
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography color={getStatusColor(value)}>
          {value}
        </Typography>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
  ];

  // Calculate statistics
  const stats = {
    totalRecords: mockAttendanceRecords.length,
    present: mockAttendanceRecords.filter(record => record.status === "Present").length,
    absent: mockAttendanceRecords.filter(record => record.status === "Absent").length,
    late: mockAttendanceRecords.filter(record => record.status === "Late").length,
  };

  const total = stats.totalRecords || 1;
  const percentages = {
    present: ((stats.present / total) * 100).toFixed(1),
    late: ((stats.late / total) * 100).toFixed(1),
    absent: ((stats.absent / total) * 100).toFixed(1),
};

  return (
    <Box m="30px">
      <Header title="Attendance" subtitle="Track and monitor student attendance" />
      
      {/* Statistics Cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        mb= "20px"
        mt= "40px"
      >
        <Box
                bgcolor={colors.blueCard[500]}
                p="20px"
                borderRadius="10px"
                textAlign="left"
                >
                    <Typography color= "#0284C7" fontWeight={600}> Total Records</Typography>
                    <Typography fontSize="36px" color= "#0284C7" fontWeight="bold"  mt="20px">{stats.totalRecords}</Typography>
                    <Typography fontSize="12px" color= "#0284C7" fontWeight="light">Attendance record</Typography>
                </Box>
                <Box
                bgcolor={colors.greenCard[500]}
                p="20px"
                borderRadius="10px"
                textAlign="left"
                >
                    <Typography color="#00C54A" fontWeight={600}>Present</Typography>
                    <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="20px">{stats.present}</Typography>
                    <Typography fontSize="12px" color= "#00C54A" fontWeight="light">{percentages.present}% of total</Typography>
                </Box>
                <Box
                bgcolor={colors.orangeCard[500]}
                p="20px"
                borderRadius="10px"
                textAlign="left"
                >
                    <Typography color="#F59E0B" fontWeight={600}>Late</Typography>
                    <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="20px">{stats.late}</Typography>
                    <Typography fontSize="12px" color= "#F59E0B" fontWeight="light">{percentages.late}% of total</Typography>
                </Box>
                <Box
                    bgcolor={colors.redCard[500]}
                    p="20px"
                    borderRadius="10px"
                    textAlign="left"
                >
                    <Typography color="#DC2626" fontWeight={600} >Absent</Typography>
                    <Typography fontSize="36px" color="#DC2626" fontWeight="bold" mt="20px">{stats.absent}</Typography>
                    <Typography fontSize="12px" color= "#DC2626" fontWeight="light">{percentages.absent}% of total</Typography>

                </Box>
      </Box>

      {/* Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="20px"
        mb="20px"
      >
        {/* Weekly Trend */}
        <Box
          bgcolor={colors.grayCard[500]}
          p="20px"
          borderRadius="10px"
        >
          <Box display="flex" alignItems="center" mb="5px">
              <DateRangeIcon sx={{ mr: 1 }} />
              <Typography fontWeight={500}>Weekly Trend</Typography>
          </Box>
          <Typography fontSize="12px" fontWeight={300} mb={"10px"}>Attendance percentage over time</Typography>
          <Box height="300px">
            <Bar
              data={mockAttendanceData.weeklyData}
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

        {/* Monthly Trend */}
        <Box
          bgcolor={colors.grayCard[500]}
          p="20px"
          borderRadius="10px"
        >
          <Box display="flex" alignItems="center" mb="5px">
              <CalendarMonthIcon sx={{ mr: 1 }} />
              <Typography fontWeight={500}>Monthly Trend</Typography>
          </Box>
          <Typography fontSize="12px"  fontWeight={300} mb={"10px"}>Attendance percentage over time</Typography>
          <Box height="300px">
            <Line
              data={mockAttendanceData.monthlyData}
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
      </Box>

      {/* Attendance Records */}
      <Box
        bgcolor={colors.grayCard[500]}
        p="20px"
        borderRadius="10px"
      >
        <Box display="flex" alignItems="center" mb="5px">
              <EventNoteIcon sx={{ mr: 1 }} />
              <Typography fontWeight={500}>Attendance Record</Typography>
          </Box>
          <Typography fontSize="12px"  fontWeight={300} mb={"20px"}>All attendance records</Typography>
        <Box height="400px" sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <DataGrid
            rows={mockAttendanceRecords}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
                textAlign: "center"
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.grayCard[500],
                borderBottom: "none",
              // },
              // "& .MuiDataGrid-virtualScroller": {
              //   backgroundColor: colors.blackBackground[500],
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
    </Box>
  );
};

export default Attendance;