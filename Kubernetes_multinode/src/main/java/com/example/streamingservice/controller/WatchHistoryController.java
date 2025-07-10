package com.example.streamingservice.controller;

import com.example.streamingservice.model.WatchHistory;
import com.example.streamingservice.repository.WatchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/history")
public class WatchHistoryController {
    @Autowired
    private WatchHistoryRepository watchHistoryRepository;

    @GetMapping
    public List<WatchHistory> getHistory(Authentication authentication) {
        return watchHistoryRepository.findByUserId(authentication.getName());
    }

    @PostMapping
    public WatchHistory updateHistory(@RequestBody WatchHistory history, Authentication authentication) {
        history.setUserId(authentication.getName());
        WatchHistory existing = watchHistoryRepository.findByUserIdAndVideoId(history.getUserId(), history.getVideoId());
        if (existing != null) {
            existing.setProgress(history.getProgress());
            existing.setLastWatched(System.currentTimeMillis());
            return watchHistoryRepository.save(existing);
        } else {
            history.setLastWatched(System.currentTimeMillis());
            return watchHistoryRepository.save(history);
        }
    }
}
