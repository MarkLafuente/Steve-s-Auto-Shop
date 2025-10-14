import { Box, IconButton, Typography, useTheme, Menu, MenuItem, Badge } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import full_logo from "../../assets/full_logo.png";
import dudu2 from "../../assets/dudu2.jpg";
import { useState } from "react";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);


  const [notifications, setNotifications] = useState([
    { id: 1, message: "New grade uploaded for CS101", time: "5 minutes ago" },
    { id: 2, message: "Attendance updated for today", time: "1 hour ago" },
    { id: 3, message: "New assessment scheduled", time: "2 hours ago" },
  ]);

  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleNotificationIconClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0); 
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  // mark a notification as read (optional: remove)
  const handleNotificationClick = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    handleNotificationClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {/* Logo */}
      <Box display="flex" alignItems="center">
        <img
          src={full_logo}
          alt="Progresso Logo"
          style={{
            height: "60px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        {/* user profile */}
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
            <Typography variant="subtitle1" color={colors.blackBackground[100]}>
              Ms. Victoria Catabay
            </Typography>
            <Typography variant="body2" color={colors.blackBackground[200]}>
              victoria.catabay@example.com
            </Typography>
          </Box>
        </Box>
        
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton
          onClick={handleNotificationIconClick}
          sx={{
            bgcolor: colors.orangeCard[500],
            borderRadius: "10px",
            "&:hover": {
              bgcolor: colors.blackBackground[300],
            },
          }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              bgcolor: colors.blackBackground[500],
              color: colors.logoBlue[500],
              width: 300,
              borderRadius: "10px",
            },
          }}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <Box>
                  <Typography variant="body1">{notification.message}</Typography>
                  <Typography variant="caption" color={colors.logoBlue[400]}>
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No new notifications</MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
