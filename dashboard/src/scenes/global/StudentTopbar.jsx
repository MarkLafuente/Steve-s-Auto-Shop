import { useState } from "react";
import { Box, IconButton, Typography, Menu, MenuItem, Badge, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import full_logo from "../../assets/full_logo.png";
import dudu2 from "../../assets/dudu2.jpg";
import SignOutDialog from "../../components/SignOutDialog";

const Student_side = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock notifications - replace with real data
  const notifications = [
    { id: 1, message: "New grade posted for CS101", time: "5 minutes ago" },
    { id: 2, message: "Upcoming quiz reminder", time: "1 hour ago" },
    { id: 3, message: "Assignment due today", time: "2 hours ago" },
  ];

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Implement sign out logic
    setShowSignOutDialog(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {/* Logo */}
      <Box display="flex" alignItems="center">
        <img
          src={full_logo}
          alt="Progresso Logo"
          style={{
            height: "40px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Right Side Content */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* User Profile */}
        <Box
          display="flex"
          alignItems="center"
          bgcolor={colors.blackBackground[400]}
          p={1}
          borderRadius="10px"
          gap={2}
        >
          <img
            src={dudu2}
            alt="Profile"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography variant="subtitle1" color={colors.logoBlue[100]}>
              John Doe
            </Typography>
            <Typography variant="body2" color={colors.logoBlue[200]}>
              john.doe@example.com
            </Typography>
          </Box>
        </Box>

        {/* Notification Button */}
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
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        {/* Sign Out Button */}
        <IconButton
          onClick={() => setShowSignOutDialog(true)}
          sx={{
            bgcolor: colors.blackBackground[400],
            borderRadius: "10px",
            "&:hover": {
              bgcolor: colors.blackBackground[300],
            },
          }}
        >
          <LogoutIcon />
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
              width: 300,
            },
          }}
        >
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleNotificationClose}>
              <Box>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color={colors.logoBlue[200]}>
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Sign Out Dialog */}
        <SignOutDialog
          open={showSignOutDialog}
          onClose={() => setShowSignOutDialog(false)}
          onConfirm={handleSignOut}
        />
      </Box>
    </Box>
  );
};

export default Student_side;