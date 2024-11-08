package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.VideoResponseDto;
import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.service.MemberService;
import com.gamesnap.backend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @GetMapping("/random")
    public List<VideoResponseDto> getRandomVideos() {
        // 랜덤 비디오 목록을 가져옴
        List<Video> videos = videoService.getRandomVideos();

        // VideoResponse 객체로 변환하여 반환
        return videos.stream()
                .map(video -> new VideoResponseDto(
                        video.getId(),
                        video.getTitle(),
                        video.getDesc(),
                        video.getUrl(),
                        video.getLike(),
                        video.getCreateDate(),
                        video.getMember().getName()
                ))
                .collect(Collectors.toList());
    }



}
