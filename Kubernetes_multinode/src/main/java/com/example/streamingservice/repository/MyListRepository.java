package com.example.streamingservice.repository;

import com.example.streamingservice.model.MyList;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MyListRepository extends MongoRepository<MyList, String> {
    List<MyList> findByUserId(String userId);
    MyList findByUserIdAndVideoId(String userId, String videoId);
}
