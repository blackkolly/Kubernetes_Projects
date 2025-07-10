import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Likes from "./Likes";

function VideoDetailsModal({ open, video, onClose, onPlay, onAddToList }) {
  if (!open || !video) return null;
  return (
    <Box sx={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", bgcolor: "rgba(0,0,0,0.95)", zIndex: 3000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <Box sx={{ position: "relative", width: 400, bgcolor: "#181818", p: 4, borderRadius: 2, boxShadow: 8 }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}>
          <CloseIcon />
        </IconButton>
        <img src={video.posterUrl || "/netflix-thumb.jpg"} alt={video.title} style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
        <Typography variant="h5" sx={{ fontWeight: 900 }}>{video.title}</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>{video.description}</Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button variant="contained" color="primary" onClick={onPlay}>Play</Button>
          <Button variant="outlined" color="primary" onClick={onAddToList}>My List</Button>
          <Likes />
        </Box>
        <Typography variant="caption" color="text.secondary">Genres: {(video.genres || []).join(", ")}</Typography>
      </Box>
    </Box>
  );
}

export default VideoDetailsModal;
