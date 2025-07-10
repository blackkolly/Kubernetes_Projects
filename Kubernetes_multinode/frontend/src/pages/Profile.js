import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

function Profile() {
  const username = localStorage.getItem("username") || "User";
  // Placeholder for avatar and profile info
  return (
    <Box mt={8} display="flex" flexDirection="column" alignItems="center">
      <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{username[0].toUpperCase()}</Avatar>
      <Typography variant="h5">{username}</Typography>
      <Typography variant="body2" color="text.secondary">user@email.com</Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>Edit Profile</Button>
    </Box>
  );
}

export default Profile;
