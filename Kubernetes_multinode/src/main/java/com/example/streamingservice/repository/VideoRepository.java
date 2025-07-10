package com.example.streamingservice.repository;

import com.example.streamingservice.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findByUploaderId(String uploaderId);
}
