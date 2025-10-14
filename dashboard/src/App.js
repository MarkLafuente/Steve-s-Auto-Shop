import { ColorModeContext, useMode } from "./theme";
import StudentTopbar from "./scenes/student_side/StudentTopbar";
import { CssBaseline, ThemeProvider, Box } from "@mui/material"; // Add Box here
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/dashboard";
import Students from "./scenes/students/students";
import Courses from "./scenes/courses/courses";
import Assessments from "./scenes/assessments/assessments";
import Attendance from "./scenes/attendance/attendance";
import SignOutDialog from "./components/SignOutDialog";
import Login from "./scenes/auth/Login";
import SignUp from "./scenes/auth/SignUp";
import StudentDashboard from "./scenes/student_side/student_side";
import AdminDashboard from "./scenes/admin_side/adminDashboard";
import AdminTopbar from "./scenes/admin_side/adminTopbar";
import AdminSidebar from "./scenes/admin_side/adminSidebar";
import TeachersManagement from "./scenes/admin_side/teachersManagement";
import StudentsManagement from "./scenes/admin_side/studentsManagement";
import CoursesManagement from "./scenes/admin_side/coursesManagement";
import { useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [showSignOut, setShowSignOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setShowSignOut(false);
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route 
              path="/login" 
              element={
                <Login 
                  onLoginSuccess={(role) => {
                    setIsAuthenticated(true);
                    setUserRole(role);
                  }} 
                />
              } 
            />

            <Route 
              path="/signup" 
              element={<SignUp />} 
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  // Admin view
  if (userRole === "admin") {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar on the left */}
            <AdminSidebar />

            {/* Main content on the right */}
            <Box
              component="main"
              className="content"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Topbar on top */}
              <AdminTopbar onSignOutClick={() => setShowSignOut(true)} />

              {/* Routed pages below */}
              <Box sx={{ flex: 1, p: 2 }}>
                <Routes>
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/teachersManagement" element={
                    <ProtectedRoute>
                      <TeachersManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/studentsManagement" element={
                    <ProtectedRoute>
                      <StudentsManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/coursesManagement" element={
                    <ProtectedRoute>
                      <CoursesManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </Box>

              {/* Sign Out Dialog */}
              <SignOutDialog
                open={showSignOut}
                onClose={() => setShowSignOut(false)}
                onConfirm={handleSignOut}
              />
            </Box>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }


  // Student view 
  if (userRole === "student") {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <StudentTopbar onSignOutClick={() => setShowSignOut(true)} />
            <main className="content" style={{ flex: 1, overflow: "auto" }}>
              <Routes>
                <Route path="/student_side" element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/student_side" replace />} />
              </Routes>

              <SignOutDialog
                open={showSignOut}
                onClose={() => setShowSignOut(false)}
                onConfirm={handleSignOut}
              />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  // Teacher view
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex", height: "100vh" }}>
          <Sidebar 
            onSignOut={handleSignOut}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <Box 
            component="main" 
            className="content"
            sx={{
              flexGrow: 1,
              marginLeft: isCollapsed ? "80px" : "270px",
              transition: "margin-left 0.3s",
              overflow: "auto",
              height: "100vh"
            }}
          >
            <Topbar onSignOutClick={() => setShowSignOut(true)} />
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/students" element={
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />
              <Route path="/assessments" element={
                <ProtectedRoute>
                  <Assessments />
                </ProtectedRoute>
              } />
              <Route path="/attendance" element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <SignOutDialog
              open={showSignOut}
              onClose={() => setShowSignOut(false)}
              onConfirm={handleSignOut}
            />
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;