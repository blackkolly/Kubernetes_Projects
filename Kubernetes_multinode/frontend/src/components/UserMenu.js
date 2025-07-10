import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar, Typography, Box, Button, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserMenu({ onThemeToggle, darkMode }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography>{username}</Typography>
      <IconButton onClick={handleMenu} size="small">
        <Avatar>{username[0].toUpperCase()}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>
          <Switch checked={darkMode} onChange={onThemeToggle} />
          {darkMode ? "Dark" : "Light"} Mode
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
