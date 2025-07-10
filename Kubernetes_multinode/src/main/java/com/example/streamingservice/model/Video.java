package com.example.streamingservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "videos")
public class Video {
    @Id
    private String id;
    private String title;
    private String description;
    private String filename;
    private String uploaderId;
    private long uploadTime;
}
