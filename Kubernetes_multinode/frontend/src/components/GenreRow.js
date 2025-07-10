import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import VideoThumbnail from "./VideoThumbnail";

function GenreRow({ genre, videos, onSelect }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 900, color: "#fff", mb: 1 }}>{genre.name}</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", pb: 1 }}>
        {videos.map(video => (
          <VideoThumbnail key={video.id} video={video} onClick={() => onSelect(video)} />
        ))}
      </Box>
    </Box>
  );
}

export default GenreRow;
