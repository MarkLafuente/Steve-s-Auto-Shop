import { Box, IconButton, Typography, useTheme, Menu, MenuItem, Badge } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import full_logo from "../../assets/full_logo.png";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import dudu2 from "../../assets/dudu2.jpg";
import { useState } from "react";

const AdminTopbar = ({ onSignOutClick, userProfile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-between"
      alignItems="center"
      p={2}
      //bgcolor={colors.blackBackground[500]}
    >
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
        <Box 
          display="flex"
          alignItems="center"
          bgcolor={colors.blackBackground[400]}
          p={1}
          borderRadius="10px"
          gap={1}
        >
          <IconButton onClick={""}>
            <AccountCircleOutlinedIcon sx={{ color: colors.blackBackground[100] }}/>
          </IconButton>
          <Box>
            <Typography variant="subtitle1" color={colors.blackBackground[100]}>
              {userProfile?.name || "Admin"}
            </Typography>
            <Typography variant="body2" color={colors.blackBackground[200]}>
              {userProfile?.email || "admin@example.com"}
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
          // onClick={}
          sx={{
            bgcolor: colors.redCard[500],
            borderRadius: "10px",
            "&:hover": {
              bgcolor: colors.redCard[600],
            },
          }}
        >
          <LogoutOutlinedIcon />
        </IconButton>


        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              bgcolor: colors.blackBackground[500],
              color: colors.logoBlue[100],
              mt: 1,
            },
          }}
        >
          <MenuItem onClick={onSignOutClick}>Sign Out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default AdminTopbar;