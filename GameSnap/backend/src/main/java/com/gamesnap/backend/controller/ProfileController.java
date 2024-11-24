package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.*;
import com.gamesnap.backend.service.MemberService;
import com.gamesnap.backend.service.VideoService;
import jakarta.validation.constraints.Max;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private VideoService videoService;


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

    @PostMapping("/updateLikeGames")
    public ResponseEntity<ProfileUpdateGamesResponseDto> updateLikeGames(@RequestBody ProfileUpdateGamesRequestDto profileUpdateGamesRequestDto){

        return memberService.updateGames(profileUpdateGamesRequestDto.getLikeGamesId(),profileUpdateGamesRequestDto.getUserId());
    }

    @GetMapping("/getVideoList")
    public List<VideoResponseDto> getVideoList(@RequestParam("userId")Integer memberId){

        return videoService.getVideoListByMember(memberId);
    }

}
