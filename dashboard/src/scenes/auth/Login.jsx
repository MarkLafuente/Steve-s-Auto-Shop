import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import full_logo from "../../assets/full_logo.png";
import login_img from "../../assets/login_img.png";
import SignUp from "./SignUp";

const Login = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [role, setRole] = useState("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // temporary credentials
    const validTeacherEmail = "teacher@gmail.com";
    const validStudentEmail = "student@gmail.com";
    const validPassword = "passwords1234";

    if (role === "teacher") {
      if (email === validTeacherEmail && password === validPassword) {
        console.log("Integrate backend here.");
        onLoginSuccess("teacher");
        navigate("/");
      } else {
        alert("Invalid teacher email or password.");
      }
    } else {
      if (email === validStudentEmail && password === validPassword) {
        console.log("✅ Student login successful — integrate backend here.");
        onLoginSuccess("student");
        navigate("/student_side");
      } else {
        alert("Invalid student email or password.");
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={colors.whiteBackground[500]}
      px={4}
      pb={5}
      position="relative"
      overflow="hidden"
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 4, md: 8 }}
        maxWidth="1200px"
        width="100%"
        zIndex={1}
      >
        {/* LEFT: LOGIN FORM */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <img src={full_logo} alt="Progresso Logo" style={{ height: "70px" }} />
          <Typography
            fontWeight={500}
            fontSize="20px"
            color="#1F2937"
            textAlign="center"
            mb={6}
          >
            Student Performance Insight Dashboard
          </Typography>

          <Typography fontWeight={600} fontSize="22px" color="#1F2937">
            Welcome!
          </Typography>
          <Typography fontWeight={200} fontSize="14px" color="#1F2937" mb={4}>
            Choose your role and sign in to continue
          </Typography>

          {/* Role Selection */}
          {/* <Box width="100%" maxWidth="400px" mb={3}>
            <Typography
              variant="subtitle1"
              color={colors.logoBlue[400]}
              mb={2}
            >
              I am a...
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                fullWidth
                variant={role === "teacher" ? "contained" : "outlined"}
                onClick={() => setRole("teacher")}
                sx={{
                  borderRadius: "10px",
                  bgcolor:
                    role === "teacher" ? colors.logoBlue[500] : "transparent",
                  borderColor: colors.logoBlue[500],
                  color: role === "teacher" ? "#fff" : colors.logoBlue[500],
                  "&:hover": {
                    bgcolor:
                      role === "teacher"
                        ? colors.logoBlue[600]
                        : colors.logoBlue[100],
                  },
                }}
              >
                Teacher
              </Button>
              <Button
                fullWidth
                variant={role === "student" ? "contained" : "outlined"}
                onClick={() => setRole("student")}
                sx={{
                  borderRadius: "10px",
                  bgcolor:
                    role === "student" ? colors.logoBlue[500] : "transparent",
                  borderColor: colors.logoBlue[500],
                  color: role === "student" ? "#fff" : colors.logoBlue[500],
                  "&:hover": {
                    bgcolor:
                      role === "student"
                        ? colors.logoBlue[600]
                        : colors.logoBlue[100],
                  },
                }}
              >
                Student
              </Button>
            </Box>
          </Box> */}

          {/* Email + Password */}
          <Box width="100%" maxWidth="400px">
            <TextField
              fullWidth
              label="PHINMAED Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[500],
                  "& input": {
                    color: colors.logoBlue[500],
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: `0 0 0 1000px ${colors.logoBlue[100]} inset`,
                      WebkitTextFillColor: colors.logoBlue[500],
                      transition: "background-color 5000s ease-in-out 0s",
                      borderRadius: "10px"
                    },
                  },
                  "& fieldset": {
                    borderColor: colors.logoBlue[400],
                    borderRadius: "10px",
                  },
                  "&:hover fieldset": {
                    borderColor: colors.logoBlue[300],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[400],
                },
              }}
            />
            <Typography
              fontSize="12px"
              fontWeight={300}
              color={colors.logoBlue[400]}
              mb={2}
            >
              Use your official PHINMA Education email address
            </Typography>

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[500],
                  "& input": {
                    color: colors.logoBlue[500],
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: `0 0 0 1000px ${colors.logoBlue[100]} inset`,
                      WebkitTextFillColor: colors.logoBlue[500],
                      transition: "background-color 5000s ease-in-out 0s",
                      borderRadius: "10px"
                    },
                  },
                  "& fieldset": {
                    borderColor: colors.logoBlue[400],
                    borderRadius: "10px",
                  },
                  "&:hover fieldset": {
                    borderColor: colors.logoBlue[300],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[400],
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: colors.logoBlue[400] }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              onClick={() => navigate("/forgotpassworflow")}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
                color: colors.blueChart[500],
                textTransform: "none",
                mb: 2,
                "&:hover": {
                  color: colors.blueChart[600],
                  background: "transparent",
                },
              }}
            >
              Forgot Password?
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{
                borderRadius: "10px",
                background: `linear-gradient(90deg, ${colors.logoGreen[400]} 0%, ${colors.logoBlue[400]} 100%)`,
                color: "#fff",
                p: 1.5,
                "&:hover": {
                  background: `linear-gradient(90deg, ${colors.logoGreen[500]} 0%, ${colors.logoBlue[500]} 100%)`,
                },
              }}
            >
              Sign in
              {/* Sign in as {role === "teacher" ? "Teacher" : "Student"} */}
            </Button>
          </Box>

          <Typography
            fontSize="12px"
            fontWeight={300}
            color={colors.logoBlue[300]}
            mt={2}
          >
            Don’t have an account yet?
            <Button
              onClick={() => navigate("/signup")}
              sx={{
                color: colors.blueChart[500],
                textTransform: "none",
                "&:hover": {
                  color: colors.blueChart[600],
                  background: "transparent",
                },
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>

        {/* RIGHT: IMAGE CARD */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "520px",
              height: { xs: "300px", md: "650px" },
              backgroundColor: "#EDEDED",
              borderRadius: "30px",
              boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={login_img}
              alt="Login illustration"
              style={{
                width: "100%",
                maxWidth: "90%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        position="absolute"
        bottom={0}
        width="100%"
        textAlign="center"
        p={2}
        sx={{ backgroundColor: "transparent" }}
      >
        <Typography variant="body2" color={colors.logoBlue[200]}>
          © 2025 GROUP 8. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
