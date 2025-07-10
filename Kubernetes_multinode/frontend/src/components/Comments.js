import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const username = localStorage.getItem("username") || "User";
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`/api/comments/${videoId}`).then(res => setComments(res.data));
  }, [videoId]);

  const handleAdd = async () => {
    if (input.trim()) {
      const res = await axios.post(
        "/api/comments",
        { videoId, text: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, res.data]);
      setInput("");
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">Comments</Typography>
      <List>
        {comments.map((c, i) => (
          <ListItem key={i} alignItems="flex-start">
            <ListItemText primary={c.user} secondary={c.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <TextField
        label="Add a comment"
        value={input}
        onChange={e => setInput(e.target.value)}
        fullWidth
        multiline
        minRows={2}
      />
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleAdd}>Post</Button>
    </Box>
  );
}

export default Comments;
