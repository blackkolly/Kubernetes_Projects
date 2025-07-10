import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import GenreRow from "../components/GenreRow";
import VideoPlayer from "../components/VideoPlayer";
import Comments from "../components/Comments";
import Likes from "../components/Likes";
import MyListRow from "../components/MyListRow";
import ContinueWatchingRow from "../components/ContinueWatchingRow";
import VideoDetailsModal from "../components/VideoDetailsModal";
import axios from "axios";

function HomePage() {
  const [featured, setFeatured] = useState(null);
  const [genres, setGenres] = useState([]);
  const [genreVideos, setGenreVideos] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [detailsVideo, setDetailsVideo] = useState(null);

  useEffect(() => {
    axios.get("/api/genres").then(res => setGenres(res.data));
    axios.get("/api/videos").then(res => {
      setFeatured(res.data[0]);
      // Group videos by genre
      const byGenre = {};
      res.data.forEach(v => {
        (v.genres || []).forEach(g => {
          if (!byGenre[g]) byGenre[g] = [];
          byGenre[g].push(v);
        });
      });
      setGenreVideos(byGenre);
    });
  }, []);

  const handleSelect = (video) => setDetailsVideo(video);
  const handlePlay = () => {
    setSelectedVideo(detailsVideo);
    setDetailsVideo(null);
  };
  const handleAddToList = () => {
    // Add to My List API call
    axios.post("/api/mylist", { videoId: detailsVideo.id }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  };

  return (
    <Box>
      {featured && !selectedVideo && <HeroBanner featured={featured} onPlay={() => setDetailsVideo(featured)} />}
      {!selectedVideo && <MyListRow onSelect={handleSelect} />}
      {!selectedVideo && <ContinueWatchingRow onSelect={handleSelect} />}
      <VideoDetailsModal
        open={!!detailsVideo}
        video={detailsVideo}
        onClose={() => setDetailsVideo(null)}
        onPlay={handlePlay}
        onAddToList={handleAddToList}
      />
      {selectedVideo && (
        <Box mb={4}>
          <Typography variant="h5" sx={{ color: "#fff" }}>{selectedVideo.title}</Typography>
          <VideoPlayer
            src={`/api/videos/stream/${selectedVideo.id}`}
            title={selectedVideo.title}
            introStart={selectedVideo.introStart || 0}
            introEnd={selectedVideo.introEnd || 60}
            // Subtitles demo: could be fetched from API or video object
            subtitles={selectedVideo.subtitles || [
              { label: "English", lang: "en", src: `/api/videos/subtitles/${selectedVideo.id}/en.vtt` },
              { label: "Español", lang: "es", src: `/api/videos/subtitles/${selectedVideo.id}/es.vtt` }
            ]}
            // Audio tracks demo: could be fetched from API or video object
            audioTracks={selectedVideo.audioTracks || [
              { label: "English", lang: "en", src: `/api/videos/audio/${selectedVideo.id}/en.mp4` },
              { label: "Español", lang: "es", src: `/api/videos/audio/${selectedVideo.id}/es.mp4` }
            ]}
            // Quality demo: could be fetched from API or video object
            qualities={selectedVideo.qualities || [
              { label: "1080p", src: `/api/videos/stream/${selectedVideo.id}?q=1080` },
              { label: "720p", src: `/api/videos/stream/${selectedVideo.id}?q=720` },
              { label: "480p", src: `/api/videos/stream/${selectedVideo.id}?q=480` }
            ]}
            onNextEpisode={() => {
              // Auto-play next video in the same genre (or any logic)
              const genre = (selectedVideo.genres && selectedVideo.genres[0]) || null;
              if (genre && genreVideos[genre] && genreVideos[genre].length > 0) {
                const idx = genreVideos[genre].findIndex(v => v.id === selectedVideo.id);
                const next = genreVideos[genre][idx + 1];
                if (next) {
                  setSelectedVideo(next);
                  return;
                }
              }
              setSelectedVideo(null);
            }}
          />
          <Likes />
          <Comments videoId={selectedVideo.id} />
          {/* Further Enhancements: Show recommended videos after player */}
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>Recommended For You</Typography>
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
              {(genreVideos[(selectedVideo.genres && selectedVideo.genres[0]) || ""] || [])
                .filter(v => v.id !== selectedVideo.id)
                .slice(0, 5)
                .map(rec => (
                  <Box key={rec.id} sx={{ minWidth: 200, cursor: 'pointer' }} onClick={() => setSelectedVideo(rec)}>
                    <img src={rec.thumbnail || '/placeholder.png'} alt={rec.title} style={{ width: '100%', borderRadius: 8 }} />
                    <Typography sx={{ color: '#fff', mt: 1 }}>{rec.title}</Typography>
                  </Box>
                ))}
            </Box>
          </Box>
          <Typography sx={{ mt: 2, color: "#e50914", cursor: "pointer" }} onClick={() => setSelectedVideo(null)}>
            Back to Browse
          </Typography>
        </Box>
      )}
      {!selectedVideo && genres.map(genre => (
        <GenreRow
          key={genre.id}
          genre={genre}
          videos={genreVideos[genre.name] || []}
          onSelect={handleSelect}
        />
      ))}
    </Box>
  );
}

export default HomePage;
