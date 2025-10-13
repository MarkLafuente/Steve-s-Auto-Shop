import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import full_logo from "../../assets/full_logo.png";
import forgotPasswordImage from "../../assets/forgot-password.jpg"; // Add your image

const ForgotPasswordFlow = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // email, otp, newPassword, success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const renderStepContent = () => {
    switch (step) {
      case "email":
        return (
          <>
            <Typography variant="h4" color={colors.logoBlue[100]} mb={1}>
              Forgot Password?
            </Typography>
            <Typography variant="body1" color={colors.logoBlue[200]} mb={4}>
              Enter your PHINMA Education email to receive One-Time Pin
            </Typography>
            <TextField
              fullWidth
              label="School Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": {
                    borderColor: colors.logoBlue[200],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.logoBlue[100],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[200],
                },
              }}
            />
          </>
        );

      case "otp":
        return (
          <>
            <Typography variant="h4" color={colors.logoBlue[100]} mb={1}>
              Enter OTP
            </Typography>
            <Typography variant="body1" color={colors.logoBlue[200]} mb={4}>
              Please enter the One-Time Pin sent to your email
            </Typography>
            <TextField
              fullWidth
              label="One-Time Pin"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": {
                    borderColor: colors.logoBlue[200],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.logoBlue[100],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[200],
                },
              }}
            />
          </>
        );

      case "newPassword":
        return (
          <>
            <Typography variant="h4" color={colors.logoBlue[100]} mb={1}>
              Create New Password
            </Typography>
            <Typography variant="body1" color={colors.logoBlue[200]} mb={4}>
              Please enter your new password
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": {
                    borderColor: colors.logoBlue[200],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.logoBlue[100],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[200],
                },
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  color: colors.logoBlue[100],
                  "& fieldset": {
                    borderColor: colors.logoBlue[200],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.logoBlue[100],
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colors.logoBlue[200],
                },
              }}
            />
          </>
        );

      case "success":
        return (
          <>
            <Typography variant="h4" color={colors.logoBlue[100]} mb={1}>
              Password Changed Successfully!
            </Typography>
            <Typography variant="body1" color={colors.logoBlue[200]} mb={4}>
              You can now login with your new password
            </Typography>
          </>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    switch (step) {
      case "email":
        setStep("otp");
        break;
      case "otp":
        setStep("newPassword");
        break;
      case "newPassword":
        setStep("success");
        break;
      case "success":
        navigate("/login");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      height="100vh"
      bgcolor={colors.blackBackground[500]}
    >
      {/* Left Side - Image */}
      <Box
        sx={{
          backgroundImage: `url(${forgotPasswordImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Side - Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
        gap={3}
      >
        <img
          src={full_logo}
          alt="Progresso Logo"
          style={{ height: "60px", marginBottom: "40px" }}
        />

        <Box width="100%" maxWidth="400px">
          {renderStepContent()}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              onClick={() => 
                step === "email" 
                  ? navigate("/login") 
                  : setStep(prev => {
                      if (prev === "otp") return "email";
                      if (prev === "newPassword") return "otp";
                      if (prev === "success") return "newPassword";
                      return prev;
                    })
              }
              sx={{
                color: colors.logoBlue[200],
                borderColor: colors.logoBlue[200],
                "&:hover": {
                  borderColor: colors.logoBlue[100],
                  color: colors.logoBlue[100],
                },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                bgcolor: colors.logoGreen[500],
                color: "#fff",
                "&:hover": {
                  bgcolor: colors.logoGreen[600],
                },
              }}
            >
              {step === "success" ? "Return to Login" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        position="absolute"
        bottom={0}
        width="100%"
        textAlign="center"
        p={2}
      >
        <Typography variant="body2" color={colors.logoBlue[200]}>
          © 2025 GROUP 8. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordFlow;