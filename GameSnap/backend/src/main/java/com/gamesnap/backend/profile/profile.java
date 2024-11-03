package com.gamesnap.backend.profile;

import com.gamesnap.backend.entity.Member;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RequestMapping("/gamesnap")
public class profile {
    @GetMapping("/profile")
    public ResponseEntity<Member> getUserprofile() {
        
    }
    

}
