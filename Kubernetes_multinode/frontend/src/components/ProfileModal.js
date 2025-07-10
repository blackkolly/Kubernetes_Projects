import React, { useState } from "react";
import { Box, Typography, Avatar, Grid, Button } from "@mui/material";

const profiles = [
  { name: "Alice", avatar: "/profile1.png" },
  { name: "Bob", avatar: "/profile2.png" },
  { name: "Kids", avatar: "/profile-kids.png" }
];

function ProfileModal({ open, onSelect }) {
  if (!open) return null;
  return (
    <Box sx={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", bgcolor: "rgba(0,0,0,0.9)", zIndex: 2000,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <Typography variant="h3" sx={{ color: "#fff", mb: 4, fontWeight: 900 }}>Who's watching?</Typography>
      <Grid container spacing={4} justifyContent="center">
        {profiles.map(profile => (
          <Grid item key={profile.name}>
            <Button onClick={() => onSelect(profile)} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar src={profile.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
              <Typography variant="h6" sx={{ color: "#fff" }}>{profile.name}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProfileModal;
