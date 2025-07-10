package com.example.streamingservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "ratings")
public class Rating {
    @Id
    private String id;
    private String userId;
    private String videoId;
    private int value; // 1 for like, -1 for dislike
}
