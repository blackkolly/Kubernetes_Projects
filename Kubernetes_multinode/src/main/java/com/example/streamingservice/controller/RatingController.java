package com.example.streamingservice.controller;

import com.example.streamingservice.model.Rating;
import com.example.streamingservice.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {
    @Autowired
    private RatingRepository ratingRepository;

    @GetMapping("/{videoId}")
    public List<Rating> getRatings(@PathVariable String videoId) {
        return ratingRepository.findByVideoId(videoId);
    }

    @PostMapping
    public Rating rate(@RequestBody Rating rating, Authentication authentication) {
        rating.setUserId(authentication.getName());
        Rating existing = ratingRepository.findByUserIdAndVideoId(rating.getUserId(), rating.getVideoId());
        if (existing != null) {
            existing.setValue(rating.getValue());
            return ratingRepository.save(existing);
        } else {
            return ratingRepository.save(rating);
        }
    }
}
