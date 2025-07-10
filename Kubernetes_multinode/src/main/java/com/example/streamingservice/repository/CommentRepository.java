package com.example.streamingservice.repository;

import com.example.streamingservice.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByVideoId(String videoId);
}
