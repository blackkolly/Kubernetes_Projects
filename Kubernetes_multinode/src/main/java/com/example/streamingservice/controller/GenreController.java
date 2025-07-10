package com.example.streamingservice.controller;

import com.example.streamingservice.model.Genre;
import com.example.streamingservice.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {
    @Autowired
    private GenreRepository genreRepository;

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    @PostMapping
    public Genre addGenre(@RequestBody Genre genre) {
        return genreRepository.save(genre);
    }
}
