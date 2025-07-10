import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import Likes from "../components/Likes";
import VideoPlayer from "../components/VideoPlayer";
import VideoThumbnail from "../components/VideoThumbnail";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/videos").then((res) => setVideos(res.data));
  }, []);

  const handleSelect = (video) => setSelectedVideo(video);

  return (
    <Box mt={4}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 900, color: "#fff" }}
      >
        Popular on Netflix
      </Typography>
      {!selectedVideo && (
        <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
          {videos.map((video) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              onClick={() => handleSelect(video)}
            />
          ))}
        </Box>
      )}
      {selectedVideo && (
        <Box mb={4}>
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {selectedVideo.title}
          </Typography>
          <VideoPlayer
            src={`/api/videos/stream/${selectedVideo.id}`}
            title={selectedVideo.title}
          />
          <Likes />
          <Comments videoId={selectedVideo.id} />
          <Button
            sx={{ mt: 2, color: "#e50914" }}
            onClick={() => setSelectedVideo(null)}
          >
            Back to Browse
          </Button>
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default VideoList;
