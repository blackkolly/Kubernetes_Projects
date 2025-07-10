import React, { useRef, useState } from "react";
import { Button, LinearProgress, Typography, Box, Alert, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file) {
      setError("Please select a file");
      return;
    }
    if (file.size > 500 * 1024 * 1024) {
      setError("File size must be under 500MB");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    try {
      await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total))
      });
      setSuccess("Upload successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Upload failed");
    }
  };

  return (
    <Box mt={8}>
      <Typography variant="h4" gutterBottom>Upload Video</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Title" fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField label="Description" fullWidth margin="normal" value={description} onChange={e => setDescription(e.target.value)} />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Select File
          <input type="file" hidden ref={inputRef} onChange={e => setFile(e.target.files[0])} />
        </Button>
        {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name} ({(file.size/1024/1024).toFixed(2)} MB)</Typography>}
        {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Upload</Button>
      </form>
    </Box>
  );
}

export default Upload;
