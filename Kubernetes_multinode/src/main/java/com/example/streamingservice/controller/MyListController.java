package com.example.streamingservice.controller;

import com.example.streamingservice.model.MyList;
import com.example.streamingservice.repository.MyListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mylist")
public class MyListController {
    @Autowired
    private MyListRepository myListRepository;

    @GetMapping
    public List<MyList> getMyList(Authentication authentication) {
        return myListRepository.findByUserId(authentication.getName());
    }

    @PostMapping
    public MyList addToMyList(@RequestBody MyList myList, Authentication authentication) {
        myList.setUserId(authentication.getName());
        return myListRepository.save(myList);
    }

    @DeleteMapping("/{videoId}")
    public void removeFromMyList(@PathVariable String videoId, Authentication authentication) {
        MyList entry = myListRepository.findByUserIdAndVideoId(authentication.getName(), videoId);
        if (entry != null) myListRepository.delete(entry);
    }
}
