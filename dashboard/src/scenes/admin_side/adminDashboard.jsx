import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const AdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mockData = {
    totalUsers: 150,
    totalStudents: 120,
    totalTeachers: 30,
    totalCourses: 25,
    recentUsers: [
      { name: "John Doe", email: "john.doe@example.com", role: "Student" },
      { name: "Jane Smith", email: "jane.smith@example.com", role: "Teacher" },
    ],
    courses: [
      { code: "CS101", title: "Introduction to Computer Science" },
      { code: "MATH201", title: "Advanced Mathematics" },
    ],
  };

  return (
    <Box m="30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your admin dashboard" />
      </Box>

      {/* === FIRST ROW: STAT CARDS === */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        my="20px"
      >
        <Box bgcolor={colors.blueCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <PeopleOutlinedIcon sx={{ color: "#0284C7", fontSize: "26px" }} />
          <Typography color="#0284C7" fontWeight={600}>
            Total Users
          </Typography>
          <Typography fontSize="36px" color="#0284C7" fontWeight="bold" mt="20px">
            {mockData.totalUsers}
          </Typography>
          <Typography fontSize="12px" color="#0284C7">
            Active this period
          </Typography>
        </Box>
        <Box bgcolor={colors.greenCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <SchoolIcon sx={{ color: "#00C54A", fontSize: "26px" }} />
          <Typography color="#00C54A" fontWeight={600}>
            Total Students
          </Typography>
          <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="20px">
            {mockData.totalStudents}
          </Typography>
          <Typography fontSize="12px" color="#00C54A">
            Enrolled Students
          </Typography>
        </Box>
        <Box bgcolor={colors.orangeCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <PersonOutlinedIcon sx={{ color: "#F59E0B", fontSize: "26px" }} />
          <Typography color="#F59E0B" fontWeight={600}>
            Total Teachers
          </Typography>
          <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="20px">
            {mockData.totalTeachers}
          </Typography>
          <Typography fontSize="12px" color="#F59E0B">
            Active Faculty Members
          </Typography>
        </Box>
        <Box bgcolor={colors.purpleCard[500]} p="20px" borderRadius="10px" textAlign="left">
          <MenuBookIcon sx={{ color: "#A859FB" , fontSize: "26px" }} />
          <Typography color="#A859FB"  fontWeight={600}>
            Total Courses
          </Typography>
          <Typography fontSize="36px" color="#A859FB"  fontWeight="bold" mt="20px">
            {mockData.totalCourses}
          </Typography>
          <Typography fontSize="12px" color="#A859FB" >
            Active Faculty Members
          </Typography>
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="20px">
        <Box
          backgroundColor={colors.blackBackground[400]}
          borderRadius="10px"
          p="20px"
          mb="20px"
        >
          <Box display="flex" alignItems="center" mb="15px">
            <PeopleOutlinedIcon sx={{ mr: 1 }} />
            <Typography fontWeight={500}>Recent Users</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="10px">
            {mockData.recentUsers.map((user, i) => (
              <Box
                key={`${user.name}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgcolor={colors.blackBackground[500]}
                p="15px"
                borderRadius="8px"
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    color={colors.editGray[500]}
                  >
                    {user.name}
                  </Typography>
                  <Typography 
                    fontSize={12}
                    color={colors.editGray[600]}>
                    {user.email}
                  </Typography>
                </Box>
                <Typography
                  backgroundColor={
                    user.role === "Student"
                      ? colors.logoGreen[500]
                      : colors.logoBlue[500]
                  }
                  p="5px 10px"
                  borderRadius="4px"
                  color="#fff"
                >
                  {user.role}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          backgroundColor={colors.blackBackground[400]}
          borderRadius="10px"
          p="15px"
        >
          <Box display="flex" alignItems="center" mb="15px">
            <MenuBookIcon sx={{ mr: 1 }} />
            <Typography fontWeight={500}>Courses </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="10px">
            {mockData.courses.map((course, i) => (
              <Box
                key={`${course.code}-${i}`}
                display="flex"
                flexDirection="column"
                bgcolor={colors.blackBackground[500]}
                p="15px"
                borderRadius="8px"
              >
                <Typography
                  fontWeight="600"
                  color={colors.editGray[500]}
                >
                  {course.code}
                </Typography>
                <Typography 
                  fontSize={12}
                  color={colors.editGray[600]}>
                  {course.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
