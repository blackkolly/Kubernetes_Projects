package com.example.streamingservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "mylist")
public class MyList {
    @Id
    private String id;
    private String userId;
    private String videoId;
}
