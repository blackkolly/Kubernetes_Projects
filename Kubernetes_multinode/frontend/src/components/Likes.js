import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Likes({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setCount(count + 1);
      setLiked(true);
    }
  };

  return (
    <>
      <IconButton color={liked ? "primary" : "default"} onClick={handleLike}>
        <ThumbUpIcon />
      </IconButton>
      <Typography variant="body2" component="span">{count}</Typography>
    </>
  );
}

export default Likes;
