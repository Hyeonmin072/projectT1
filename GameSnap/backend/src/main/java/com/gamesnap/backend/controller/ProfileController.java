package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.ProfileUpdateContentRequestDto;
import com.gamesnap.backend.dto.ProfileUpdateNameRequestDto;
import com.gamesnap.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private MemberService memberService;


    @PostMapping("/updateContent")
    public ResponseEntity<String> updateContent(@RequestBody ProfileUpdateContentRequestDto profileUpdateContentRequestDto){

        return memberService.updateContent(profileUpdateContentRequestDto.getContent(),profileUpdateContentRequestDto.getUserId());
    }

    @PostMapping("/updateName")
    public ResponseEntity<String> updateName(@RequestBody ProfileUpdateNameRequestDto profileUpdateNameRequestDto){

        return memberService.updateName(profileUpdateNameRequestDto.getUserName(),profileUpdateNameRequestDto.getUserId());
    }

    @PostMapping("/uploadImg")
    public ResponseEntity<String> updateImage(@RequestParam("image")MultipartFile file,
                                              @RequestParam("userId")Integer memberId){

       return memberService.updateImage(file,memberId);
    }

}
