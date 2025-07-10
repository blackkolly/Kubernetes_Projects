package com.example.streamingservice.repository;

import com.example.streamingservice.model.WatchHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WatchHistoryRepository extends MongoRepository<WatchHistory, String> {
    List<WatchHistory> findByUserId(String userId);
    WatchHistory findByUserIdAndVideoId(String userId, String videoId);
}
