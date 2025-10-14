import { useState } from "react";
import { ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme} from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SignOutDialog from "../../components/SignOutDialog";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.logoBlue[300],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ onSignOut, isCollapsed, setIsCollapsed }) => { 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [showSignOutDialog, setShowSignOutDialog] = useState(false);

    const handleSignOut = () => {
        setShowSignOutDialog(false);
        onSignOut(); 
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0, 
                height: "100vh", 
                zIndex: 1000,
                "& .pro-sidebar-inner": {
                    background: `${colors.blackBackground[500]} !important`,
                },
                "& .pro-icon": {
                color: `${colors.logoBlue[300]} !important`,
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                 "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                color: `${colors.logoBlue[300]} !important`,
                transition: "color 0.2s ease",
                },
                "& .pro-inner-item:hover": {
                color: `${colors.logoBlue[300]} !important`,
                },
                "& .pro-menu-item.active": {
                color: `${colors.logoBlue[500]} !important`,
                },
                "& .signout-item:hover": {
                color: "#e42c2cff !important", 
                },
                "& .signout-item:hover .pro-icon-wrapper": { 
                    color: "#f96a6aff !important",
                },

            }}
        >

            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                {/* logo and menu */}
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                    margin: "10px 0 20px 0",
                    color: colors.blackBackground[200],
                    }}
                >
                    {!isCollapsed && (
                    <Box
                        display="flex"
                        justifyContent="space-end"
                        alignItems="center"
                        ml="15px"
                    >
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuOutlinedIcon />
                        </IconButton>
                    </Box>
                    )}
                </MenuItem>

                { /*menu items */ }
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    height="100%"
                    paddingLeft={isCollapsed ? undefined : "10%"}
                >
                    {/* Main Menu Items */}
                    <Box flex="1">
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<SpaceDashboardOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Students"
                            to="/students"
                            icon={<SchoolOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Attendance"
                            to="/attendance"
                            icon={<CoPresentIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Courses"
                            to="/courses"
                            icon={<ClassOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Assessments"
                            to="/assessments"
                            icon={<QuizOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>

                    {/* sign out */}
                    <MenuItem
                        className="signout-item"
                        style={{
                            color: "#DC2626",
                            marginBottom: "20px",
                        }}
                        
                        icon={<LogoutOutlinedIcon />}
                        onClick={() => setShowSignOutDialog(true)} 
                    >
                        <Typography>Sign Out</Typography>
                    </MenuItem>
                </Box>
                </Menu>
            </ProSidebar>

            {/* sign out dialog */}
            <SignOutDialog
                open={showSignOutDialog}
                onClose={() => setShowSignOutDialog(false)}
                onConfirm={handleSignOut}
            />
            
    </Box>
  );
};

export default Sidebar;