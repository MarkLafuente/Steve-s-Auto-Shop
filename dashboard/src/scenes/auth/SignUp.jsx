import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import full_logo from "../../assets/full_logo.png";
import sign_up from "../../assets/sign_up.png";

// replace with real data
const mockData = {
  departments: ["CITE", "CMA", "CAS", "CELA", "CCJE", "CAHS", "CEA"],
  courses: ["BSCE", "BSIT", "BSA", "BSN", "BSTM", "BSHM"],
  sections: ["1", "2", "3", "4"],
  years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
};

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    department: "",
    course: "",
    section: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={colors.blackBackground[500]}
      px={4}
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
        {/*form*/}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          p={4}
          width="100%"
          maxWidth="600px"
        >
          {/* <img src={full_logo} alt="Progresso Logo" style={{ height: "50px", marginBottom: "2rem" }} /> */}
          
          <Typography
            variant="h1"
            fontWeight={600}
            fontSize="36px"
            color= "#1E1E1E"
            mt={2}
            mb={4}
          >
            Sign Up
          </Typography>

          {/* Role Selection */}
          {/* <Box width="100%" mb={3}>
            <Typography variant="subtitle1" color={colors.logoBlue[400]} mb={2}>
              I am a...
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                fullWidth
                variant={role === "teacher" ? "contained" : "outlined"}
                onClick={() => setRole("teacher")}
                sx={{
                  borderRadius: "10px",
                  bgcolor: role === "teacher" ? colors.logoBlue[500] : "transparent",
                  borderColor: colors.logoBlue[500],
                  color: role === "teacher" ? "#fff" : colors.logoBlue[500],
                  "&:hover": {
                    bgcolor: role === "teacher" ? colors.logoBlue[600] : colors.logoBlue[100],
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
                  bgcolor: role === "student" ? colors.logoBlue[500] : "transparent",
                  borderColor: colors.logoBlue[500],
                  color: role === "student" ? "#fff" : colors.logoBlue[500],
                  "&:hover": {
                    bgcolor: role === "student" ? colors.logoBlue[600] : colors.logoBlue[100],
                  },
                }}
              >
                Student
              </Button>
            </Box>
          </Box> */}

          {/* form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {/* Name Fields */}
            <Box display="flex" gap={2}>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                required
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
                    borderColor: colors.logoBlue[500],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[400],
                },
                }}
              />
              <TextField
                name="middleInitial"
                label="Middle Initial"
                value={formData.middleInitial}
                onChange={handleInputChange}
                fullWidth
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
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                required
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
              />
            </Box>

           <Box display="flex" gap={2}>
                <FormControl
                fullWidth
                sx={{
                    "& .MuiInputLabel-root": {
                    color: colors.logoBlue[400],
                    },
                    "& .MuiOutlinedInput-root": {
                    color: colors.logoBlue[500],
                    backgroundColor: "transparent",
                    "& .MuiSelect-select": {
                        color: colors.logoBlue[500],
                        backgroundColor: "transparent",
                        "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px ${colors.logoBlue[100]} inset`,
                        WebkitTextFillColor: colors.logoBlue[500],
                        transition: "background-color 5000s ease-in-out 0s",
                        borderRadius: "10px",
                        },
                    },
                    "& fieldset": {
                        borderColor: colors.logoBlue[400],
                        borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                        borderColor: colors.logoBlue[300],
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: colors.logoBlue[300],
                    },
                    },
                    "& .MuiSvgIcon-root": {
                    color: colors.logoBlue[400],
                    },
                }}
                >
                <InputLabel>Department</InputLabel>
                <Select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    displayEmpty
                >
                    {/* <MenuItem value="" disabled>
                        Select Department
                    </MenuItem> */}
                    {mockData.departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                        {dept}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>


                {/* {role === "student" && (
                    <FormControl fullWidth>
                    <InputLabel sx={{ color: colors.logoBlue[200] }}>Course</InputLabel>
                    <Select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                        sx={{
                        color: colors.logoBlue[100],
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: colors.logoBlue[200],
                            borderRadius: "10px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: colors.logoBlue[100],
                        },
                        "& .MuiSvgIcon-root": {
                            color: colors.logoBlue[100],
                        },
                        }}
                    >
                        {mockData.courses.map((course) => (
                        <MenuItem key={course} value={course}>
                            {course}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                )} */}
                </Box>

                {/* {role === "student" && (
                <Box display="flex" gap={2}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: colors.logoBlue[200] }}>Year</InputLabel>
                    <Select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      sx={{
                        color: colors.logoBlue[100],
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.logoBlue[200],
                          borderRadius: "10px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.logoBlue[100],
                        },
                        "& .MuiSvgIcon-root": {
                          color: colors.logoBlue[100],
                        },
                      }}
                    >
                      {mockData.years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel sx={{ color: colors.logoBlue[200] }}>Section</InputLabel>
                    <Select
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      required
                      sx={{
                        color: colors.logoBlue[100],
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.logoBlue[200],
                          borderRadius: "10px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.logoBlue[100],
                        },
                        "& .MuiSvgIcon-root": {
                          color: colors.logoBlue[100],
                        },
                      }}
                    >
                      {mockData.sections.map((section) => (
                        <MenuItem key={section} value={section}>
                          {section}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                )} */}
                
            

            {/* Email and Password Fields */}
            <TextField
              name="email"
              label="School Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
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
            />

            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
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

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: colors.logoBlue[400] }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "50px",
                background: `linear-gradient(90deg,${colors.logoGreen[400]} 0%, ${colors.logoBlue[400]} 100%)`,
                color: "#fff",
                p: 1.5,
                "&:hover": {
                    background: `linear-gradient(90deg,${colors.logoGreen[500]} 0%, ${colors.logoBlue[500]} 100%)`,
                },
              }}
            >
              Create Account
            </Button>

            {/* Login Link */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                <Typography
                    fontSize="12px"
                    fontWeight={300}
                    color={colors.logoBlue[300]}
                >
                    Already have an account?
                </Typography>
                <Button
                    onClick={() => navigate("/login")}
                    sx={{
                    color: colors.blueChart[500],
                    textTransform: "none",
                    "&:hover": {
                        color: colors.blueChart[600],
                        background: "transparent",
                    },
                    }}
                >
                    Log in
                </Button>
                </Box>

          </Box>
        </Box>

        {/* RIGHT SIDE - IMAGE */}
        <Box
          flex={1}
          display={{ xs: "none", md: "flex" }}
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "520px",
              height: "720px",
            //   backgroundColor: "#1E1E1E",
            //   borderRadius: "30px",
            //   boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={sign_up}
              alt="Sign up illustration"
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

export default SignUp;
