package com.example.streamingservice.controller;

import com.example.streamingservice.model.Video;
import com.example.streamingservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videos")
public class VideoController {
    @Value("${media.storage.path}")
    private String mediaStoragePath;
    @Autowired
    private VideoRepository videoRepository;

    @PostMapping("/upload")
    public Map<String, String> uploadVideo(@RequestParam("file") MultipartFile file,
                                           @RequestParam("title") String title,
                                           @RequestParam("description") String description,
                                           Authentication authentication) throws IOException {
        String uploader = authentication.getName();
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(mediaStoragePath, filename);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setFilename(filename);
        video.setUploaderId(uploader);
        video.setUploadTime(System.currentTimeMillis());
        videoRepository.save(video);
        // TODO: Trigger FFmpeg processing here (transcoding, thumbnail)
        Map<String, String> resp = new HashMap<>();
        resp.put("message", "Video uploaded");
        return resp;
    }

    @GetMapping
    public List<Video> listVideos() {
        return videoRepository.findAll();
    }

    @GetMapping("/stream/{id}")
    public ResponseEntity<byte[]> streamVideo(@PathVariable String id) throws IOException {
        Video video = videoRepository.findById(id).orElse(null);
        if (video == null) return ResponseEntity.notFound().build();
        File file = new File(mediaStoragePath, video.getFilename());
        if (!file.exists()) return ResponseEntity.notFound().build();
        byte[] data = Files.readAllBytes(file.toPath());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentLength(data.length);
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }
}
