package com.gamesnap.backend.controller;


import com.gamesnap.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private MemberService memberService;


    @PostMapping("/updateContent")
    public ResponseEntity<String> updateContent(@RequestParam("content")String content,
                                                @RequestParam("userId")Integer memberId){

        return memberService.updateContent(content,memberId);
    }

    @PostMapping("/updateName")
    public ResponseEntity<String> updateName(@RequestParam("name")String name,
                                             @RequestParam("userId")Integer memberId){

        return memberService.updateName(name,memberId);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> updateImage(@RequestParam("image")MultipartFile file,
                                              @RequestParam("userId")Integer memberId){

       return memberService.updateImage(file,memberId);
    }

}
