import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

function HeroBanner({ featured, onPlay }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: 420,
        background: `url(${featured.posterUrl || "/netflix-thumb.jpg"}) center/cover no-repeat`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        color: "#fff",
        p: 4,
        mb: 4,
        borderRadius: 2,
        boxShadow: 6
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 900 }}>{featured.title}</Typography>
      <Typography variant="h6" sx={{ maxWidth: 600, my: 2 }}>{featured.description}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontWeight: 700, fontSize: 18, px: 4, py: 1 }}
        onClick={onPlay}
      >
        Play
      </Button>
    </Box>
  );
}

export default HeroBanner;
