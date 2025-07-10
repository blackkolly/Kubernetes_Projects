package com.example.streamingservice.repository;

import com.example.streamingservice.model.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {
    List<Rating> findByVideoId(String videoId);
    Rating findByUserIdAndVideoId(String userId, String videoId);
}
