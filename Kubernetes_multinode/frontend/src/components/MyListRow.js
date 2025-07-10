import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import VideoThumbnail from "./VideoThumbnail";
import axios from "axios";

function MyListRow({ onSelect }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/mylist", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      const videoIds = res.data.map(entry => entry.videoId);
      axios.get("/api/videos").then(vres => {
        setVideos(vres.data.filter(v => videoIds.includes(v.id)));
      });
    });
  }, []);

  if (!videos.length) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 900, color: "#fff", mb: 1 }}>My List</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", pb: 1 }}>
        {videos.map(video => (
          <VideoThumbnail key={video.id} video={video} onClick={() => onSelect(video)} />
        ))}
      </Box>
    </Box>
  );
}

export default MyListRow;
