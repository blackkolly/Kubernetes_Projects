import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

function AdminDashboard() {
  // Placeholder stats
  const stats = [
    { label: "Users", value: 42 },
    { label: "Videos", value: 128 },
    { label: "Comments", value: 256 }
  ];
  return (
    <Box mt={8}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        {stats.map(s => (
          <Grid item xs={12} sm={4} key={s.label}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">{s.label}</Typography>
              <Typography variant="h4">{s.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
