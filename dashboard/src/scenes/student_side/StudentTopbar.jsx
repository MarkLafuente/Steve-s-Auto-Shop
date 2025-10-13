import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  Avatar,
} from "@mui/material";
import { tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import full_logo from "../../assets/full_logo.png";

const StudentTopbar = ({ onSignOutClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  // Mock notifications - replace with real data
  const notifications = [
    { id: 1, message: "New grade posted for Mathematics", time: "5 minutes ago" },
    { id: 2, message: "Upcoming quiz in Physics", time: "1 hour ago" },
    { id: 3, message: "Assignment due today in Programming", time: "2 hours ago" },
  ];

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor={colors.blackBackground[500]}
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      {/* LOGO */}
      <Box display="flex" alignItems="center">
        <img
          src={full_logo}
          alt="Progresso Logo"
          style={{ height: "40px", width: "auto", objectFit: "contain" }}
        />
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Profile Icon */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            bgcolor: colors.blackBackground[400],
            p: 1,
            px: 2,
            borderRadius: "10px",
            cursor: "pointer",
            "&:hover": {
              bgcolor: colors.blackBackground[300],
            },
          }}
          onClick={handleProfileClick}
        >
          <Avatar
            sx={{
              bgcolor: colors.logoBlue[500],
              width: 32,
              height: 32,
            }}
          >
            <AccountCircleIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color={colors.logoBlue[100]}>
              Victoria Catabay
            </Typography>
            <Typography variant="caption" color={colors.logoBlue[200]}>
              student@gmail.com
            </Typography>
          </Box>
        </Box>

        {/* Notification Bell */}
        <IconButton
          onClick={handleNotificationClick}
          sx={{
            bgcolor: colors.blackBackground[400],
            borderRadius: "10px",
            "&:hover": {
              bgcolor: colors.blackBackground[300],
            },
          }}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsOutlinedIcon sx={{ color: colors.logoBlue[100] }} />
          </Badge>
        </IconButton>

        {/* sign out */}
        <IconButton
          onClick={onSignOutClick}
          sx={{
            bgcolor: colors.redCard[200],
            borderRadius: "10px",
            "&:hover": {
              bgcolor: colors.blackBackground[300],
            },
          }}
        >
          <LogoutIcon sx={{ color: "#DC2626" }} />
        </IconButton>

        {/* Notifications Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              bgcolor: colors.blackBackground[500],
              color: colors.logoBlue[100],
              width: 320,
              borderRadius:"10px",
              maxHeight: 400,
              mt: 1,
              "& .MuiMenuItem-root": {
                borderBottom: `1px solid ${colors.blackBackground[400]}`,
                "&:last-child": {
                  borderBottom: "none",
                },
              },
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ p: 2, fontWeight: "bold" }}>
            Notifications
          </Typography>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleNotificationClose}
              sx={{ p: 2 }}
            >
              <Box>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color={colors.logoBlue[200]}>
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
          PaperProps={{
            sx: {
              bgcolor: colors.blackBackground[500],
              color: colors.logoBlue[100],
              width: 200,
              mt: 1,
            },
          }}
        >
          <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
          <MenuItem onClick={onSignOutClick} sx={{ color: "#DC2626" }}>
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default StudentTopbar;