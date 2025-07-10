import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

function NetflixNav({ isAuthenticated, darkMode, onThemeToggle }) {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ background: "#141414" }} elevation={0}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img src="/netflix-logo.png" alt="Netflix" style={{ height: 32, marginRight: 16 }} />
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          {isAuthenticated && <Button color="inherit" onClick={() => navigate("/upload")}>Upload</Button>}
          {isAuthenticated && <Button color="inherit" onClick={() => navigate("/admin")}>Admin</Button>}
        </Box>
        {isAuthenticated && <UserMenu darkMode={darkMode} onThemeToggle={onThemeToggle} />}
      </Toolbar>
    </AppBar>
  );
}

export default NetflixNav;
