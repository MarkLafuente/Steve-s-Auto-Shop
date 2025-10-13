import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AdjustIcon from '@mui/icons-material/Adjust';
import TimelineIcon from "@mui/icons-material/Timeline";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { LinearProgress } from "@mui/material";


// mock
const studentData = {
  overallGrade: "A",
  gradePercentage: 92.5,
  attendanceRate: 95,
  completedAssignments: 2,
  totalAssignments: 12,
  upcomingAssignments: [
    { id: 1, title: "Math Quiz", dueDate: "2024-02-15", subject: "Mathematics" },
    { id: 2, title: "Physics Lab Report", dueDate: "2024-02-17", subject: "Physics" },
    { id: 3, title: "English Essay", dueDate: "2024-02-20", subject: "English" },
  ],
  recentActivity: [
    { id: 1, action: "Submitted Assignment", subject: "Chemistry", date: "2024-02-10" },
    { id: 2, action: "Completed Quiz", subject: "Mathematics", date: "2024-02-09" },
    { id: 3, action: "Started Assignment", subject: "Physics", date: "2024-02-08" },
  ],
};

const StatCard = ({ icon, title, value, trend, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: colors.blackBackground[400],
        borderRadius: "10px",
        color: colors.logoBlue[100],
        height: "100%",
      }}
    >
        
      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
        <Box
          sx={{
            bgcolor: color,
            p: 1,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
        {trend && (
          <Box display="flex" alignItems="center" gap={0.5}>
            {trend === "up" ? (
              <TrendingUpIcon color="success" />
            ) : (
              <TrendingDownIcon color="error" />
            )}
            <Typography variant="caption" color={trend === "up" ? "success.main" : "error.main"}>
              {trend === "up" ? "+5%" : "-2%"}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {value}
      </Typography>
      <Typography variant="body2" color={colors.logoBlue[200]}>
        {title}
      </Typography>
    </Paper>
  );
};

const StudentDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const targetGPA = 90;

  return (
    <Box p={3}>
      <Box
        mb={3}
        p={4}
        sx={{
          background: "linear-gradient(90deg, #3374A2 0%, #80E7BE 100%)",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}
      >
        <Typography marginLeft= "30px" fontWeight= {600} color="#fff" fontSize={24}>
          Welcome back, Victoria!
        </Typography>
        <Typography marginLeft= "30px" fontWeight= {300} color="#fff" fontSize={16}>
          Ready to continue your learning journey?
        </Typography>
      </Box>


      {/* stats Cards */}
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px" my="20px">
        <Box bgcolor={colors.blueCard[500]} p="20px" borderRadius="10px" textAlign="left">
        <Typography color="#fff" fontWeight={600} display="flex" alignItems="center">
          <AdjustIcon sx={{ mr: 1 }} /> Current GPA
        </Typography>

        <Typography fontSize="36px" color="#0284C7" fontWeight="bold" mt="20px">
          {studentData.overallGrade}
        </Typography>

        <Typography fontSize="12px" color="#0284C7" mb={1}>
          Target: {targetGPA}%
        </Typography>

        {/* prog bar and level */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box flex={1}>
            <LinearProgress
              variant="determinate"
              value={(studentData.gradePercentage / targetGPA) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#0284C7",
                },
              }}
            />
          </Box>
          <Typography fontSize="12px" color="#fff" whiteSpace="nowrap">
            {`${studentData.gradePercentage}% achieved`}
          </Typography>
        </Box>
      </Box>

      {/* attendance */}
      <Box bgcolor={colors.greenCard[500]} p="20px" borderRadius="10px" textAlign="left">
        <Typography color="#fff" fontWeight={600} display="flex" alignItems="center">
          <CalendarMonthIcon sx={{ mr: 1 }} /> Attendance
        </Typography>

        <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="20px">
          {`${studentData.attendanceRate}%`}
        </Typography>

        <Typography fontSize="12px" color="#00C54A" mb={1}>
          This semester
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Box flex={1}>
            <LinearProgress
              variant="determinate"
              value={studentData.attendanceRate}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#00C54A",
                },
              }}
            />
          </Box>
          <Typography fontSize="12px" color="#fff" whiteSpace="nowrap">
            {`${studentData.attendanceRate}%`}
          </Typography>
        </Box>
      </Box>
        <Box bgcolor={colors.orangeCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <Typography color="#fff" fontWeight={600} display="flex" alignItems="center">
            <PendingActionsIcon sx={{ mr: 1 }}/>Pending tasks
          </Typography>
          <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="20px">
            {`${studentData.completedAssignments}/${studentData.totalAssignments}`}
          </Typography>
          <Typography fontSize="12px" color="#F59E0B">
            Assignments
          </Typography>
        </Box>
      </Box>

      {/* Statistics Grid */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ScheduleIcon />}
            title="Attendance Rate"
            value={`${studentData.attendanceRate}%`}
            trend="down"
            color="#b1b1b1ff"
          />
        </Grid>
      </Grid>

      {/* Upcoming Assignments and Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: colors.blackBackground[400],
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CalendarTodayIcon sx={{ color: colors.logoBlue[100] }} />
              <Typography variant="h6" color={colors.logoBlue[100]}>
                Upcoming Assignments
              </Typography>
            </Box>
            {studentData.upcomingAssignments.map((assignment) => (
              <Box
                key={assignment.id}
                p={2}
                mb={1}
                bgcolor={colors.blackBackground[500]}
                borderRadius="10px"
              >
                <Typography variant="subtitle1" color={colors.logoBlue[100]}>
                  {assignment.title}
                </Typography>
                <Typography variant="body2" color={colors.logoBlue[200]}>
                  {assignment.subject} · Due {assignment.dueDate}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: colors.blackBackground[400],
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <TimelineIcon sx={{ color: colors.logoBlue[100] }} />
              <Typography variant="h6" color={colors.logoBlue[100]}>
                Recent Activity
              </Typography>
            </Box>
            {studentData.recentActivity.map((activity) => (
              <Box
                key={activity.id}
                p={2}
                mb={1}
                bgcolor={colors.blackBackground[500]}
                borderRadius="10px"
              >
                <Typography variant="subtitle1" color={colors.logoBlue[100]}>
                  {activity.action}
                </Typography>
                <Typography variant="body2" color={colors.logoBlue[200]}>
                  {activity.subject} · {activity.date}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;