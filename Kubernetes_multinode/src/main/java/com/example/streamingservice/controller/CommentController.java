package com.example.streamingservice.controller;

import com.example.streamingservice.model.Comment;
import com.example.streamingservice.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/{videoId}")
    public List<Comment> getComments(@PathVariable String videoId) {
        return commentRepository.findByVideoId(videoId);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment, Authentication authentication) {
        comment.setUser(authentication.getName());
        comment.setTimestamp(System.currentTimeMillis());
        return commentRepository.save(comment);
    }
}
