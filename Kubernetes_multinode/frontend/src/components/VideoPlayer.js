import React, { useRef, useEffect, useState } from "react";

// Advanced Netflix-like Video Player: Subtitles, Multi-audio, PiP, Quality, Keyboard, Resume, Skip Intro, Next Ep
function VideoPlayer({ src, title, onNextEpisode, introStart = 0, introEnd = 60, subtitles = [], audioTracks = [], qualities = [] }) {
  const videoRef = useRef(null);
  const [showSkipIntro, setShowSkipIntro] = useState(false);
  const [showNextEpisode, setShowNextEpisode] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSubtitle, setSelectedSubtitle] = useState(subtitles[0]?.src || "");
  const [selectedAudio, setSelectedAudio] = useState(audioTracks[0]?.src || "");
  const [selectedQuality, setSelectedQuality] = useState(qualities[0]?.src || src);

  // Resume from last position
  useEffect(() => {
    const savedTime = localStorage.getItem(`resume-${selectedQuality}`);
    if (videoRef.current && savedTime) {
      videoRef.current.currentTime = parseFloat(savedTime);
    }
  }, [selectedQuality]);

  // Save progress for Continue Watching
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    localStorage.setItem(`resume-${selectedQuality}`, video.currentTime);
    // Show Skip Intro
    setShowSkipIntro(video.currentTime >= introStart && video.currentTime < introEnd);
    // Show Next Episode button in last 30s
    setShowNextEpisode(video.duration - video.currentTime <= 30);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;
      if (e.code === "Space") {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
      } else if (e.code === "ArrowRight") {
        video.currentTime += 10;
      } else if (e.code === "ArrowLeft") {
        video.currentTime -= 10;
      } else if (e.key.toLowerCase() === "f") {
        if (video.requestFullscreen) video.requestFullscreen();
      } else if (e.key.toLowerCase() === "p") {
        // Picture-in-Picture
        if (video.requestPictureInPicture) video.requestPictureInPicture();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Subtitle change
  const handleSubtitleChange = (e) => {
    setSelectedSubtitle(e.target.value);
  };

  // Audio track change (for demo, just reloads video with different src)
  const handleAudioChange = (e) => {
    setSelectedAudio(e.target.value);
    // In real apps, use Media Source Extensions or HLS.js for seamless switching
  };

  // Quality change (reloads video)
  const handleQualityChange = (e) => {
    setSelectedQuality(e.target.value);
  };

  // Skip Intro handler
  const handleSkipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = introEnd;
    }
    setShowSkipIntro(false);
  };

  // Next Episode handler
  const handleNextEpisode = () => {
    if (onNextEpisode) onNextEpisode();
  };

  // Playback speed
  const handlePlaybackRate = (e) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <video
        ref={videoRef}
        width="100%"
        height="360"
        controls
        poster="/placeholder.png"
        onTimeUpdate={handleTimeUpdate}
        onRateChange={e => setPlaybackRate(e.target.playbackRate)}
        style={{ background: "black" }}
        crossOrigin="anonymous"
      >
        <source src={selectedQuality} type="video/mp4" />
        {/* Audio track simulation: in real apps, use HLS.js or MSE for seamless switching */}
        {audioTracks.length > 0 && audioTracks.map(track => (
          <track
            key={track.label}
            kind="descriptions"
            srcLang={track.lang}
            label={track.label}
            src={track.src}
            default={track.src === selectedAudio}
          />
        ))}
        {/* Subtitles */}
        {subtitles.length > 0 && subtitles.map(sub => (
          <track
            key={sub.label}
            kind="subtitles"
            srcLang={sub.lang}
            label={sub.label}
            src={sub.src}
            default={sub.src === selectedSubtitle}
          />
        ))}
        Your browser does not support the video tag.
      </video>
      {/* Skip Intro Button */}
      {showSkipIntro && (
        <button
          onClick={handleSkipIntro}
          style={{
            position: "absolute",
            top: 20,
            right: 220,
            zIndex: 2,
            background: "#e50914",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Skip Intro
        </button>
      )}
      {/* Next Episode Button */}
      {showNextEpisode && (
        <button
          onClick={handleNextEpisode}
          style={{
            position: "absolute",
            top: 20,
            right: 120,
            zIndex: 2,
            background: "#221f1f",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Next Episode
        </button>
      )}
      {/* Quality Selector */}
      {qualities.length > 0 && (
        <div style={{ position: "absolute", bottom: 60, right: 20, zIndex: 2 }}>
          <label style={{ color: "#fff", marginRight: 8 }}>Quality:</label>
          <select value={selectedQuality} onChange={handleQualityChange}>
            {qualities.map(q => (
              <option key={q.label} value={q.src}>{q.label}</option>
            ))}
          </select>
        </div>
      )}
      {/* Audio Selector */}
      {audioTracks.length > 0 && (
        <div style={{ position: "absolute", bottom: 100, right: 20, zIndex: 2 }}>
          <label style={{ color: "#fff", marginRight: 8 }}>Audio:</label>
          <select value={selectedAudio} onChange={handleAudioChange}>
            {audioTracks.map(a => (
              <option key={a.label} value={a.src}>{a.label}</option>
            ))}
          </select>
        </div>
      )}
      {/* Subtitle Selector */}
      {subtitles.length > 0 && (
        <div style={{ position: "absolute", bottom: 140, right: 20, zIndex: 2 }}>
          <label style={{ color: "#fff", marginRight: 8 }}>Subtitles:</label>
          <select value={selectedSubtitle} onChange={handleSubtitleChange}>
            {subtitles.map(s => (
              <option key={s.label} value={s.src}>{s.label}</option>
            ))}
          </select>
        </div>
      )}
      {/* Playback Speed Selector */}
      <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 2 }}>
        <label style={{ color: "#fff", marginRight: 8 }}>Speed:</label>
        <select value={playbackRate} onChange={handlePlaybackRate}>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
}

export default VideoPlayer;
