import React from "react";
import { Box, Card, CardMedia } from "@mui/material";

function VideoThumbnail({ video, onClick }) {
  // Placeholder thumbnail, replace with real thumbnail if available
  return (
    <Card
      sx={{
        width: 300,
        height: 170,
        background: "#222",
        cursor: "pointer",
        m: 1,
        boxShadow: 3,
        transition: "transform 0.2s",
        '&:hover': { transform: "scale(1.08)" }
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="170"
        image={video.thumbnailUrl || "/netflix-thumb.jpg"}
        alt={video.title}
        sx={{ objectFit: "cover" }}
      />
    </Card>
  );
}

export default VideoThumbnail;
