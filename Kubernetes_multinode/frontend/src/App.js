import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoList from "./pages/VideoList";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NetflixNav from "./components/NetflixNav";
import netflixTheme from "./theme";
import HomePage from "./pages/HomePage";
import ProfileModal from "./components/ProfileModal";

function App() {
  const [darkMode] = useState(true); // Always dark for Netflix style
  const isAuthenticated = !!localStorage.getItem("token");
  const [profile, setProfile] = useState(localStorage.getItem("profile") || null);
  const [showProfileModal, setShowProfileModal] = useState(!profile && isAuthenticated);

  const handleProfileSelect = (profileObj) => {
    setProfile(profileObj.name);
    localStorage.setItem("profile", profileObj.name);
    setShowProfileModal(false);
  };

  return (
    <ThemeProvider theme={netflixTheme}>
      <CssBaseline />
      <Router>
        <NetflixNav isAuthenticated={isAuthenticated} darkMode={darkMode} />
        <ProfileModal open={showProfileModal} onSelect={handleProfileSelect} />
        <Box maxWidth="xl" mx="auto" mt={4}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
