package com.example.streamingservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String videoId;
    private String user;
    private String text;
    private long timestamp;
}
