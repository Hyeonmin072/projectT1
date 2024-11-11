package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.LikeStatusRequestDto;
import com.gamesnap.backend.dto.LikeStatusResponseDto;
import com.gamesnap.backend.dto.VideoRequestDto;
import com.gamesnap.backend.dto.VideoResponseDto;
import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.repository.VideoLikeRepository;
import com.gamesnap.backend.service.VideoLikeService;
import com.gamesnap.backend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private VideoService videoService;
    @Autowired
    private VideoLikeService videoLikeService;

    @PostMapping("/random")
    public List<VideoResponseDto> getRandomVideos(@RequestBody VideoRequestDto videoRequestDto) {
        // 랜덤 비디오 목록을 가져옴
        List<Video> videos = videoService.getRandomVideos(videoRequestDto.getGamesId());

        // VideoResponse 객체로 변환하여 반환
        return videos.stream()
                .map(video -> new VideoResponseDto(
                        video.getId(),
                        video.getTitle(),
                        video.getDesc(),
                        video.getUrl(),
                        video.getVideoLikes().size(),
                        video.getCreateDate(),
                        video.getMember().getName(),
                        videoLikeService.LikeStatus(video.getId(), videoRequestDto.getMemberId())
                ))
                .collect(Collectors.toList());
    }

    @PostMapping("/{videoId}/like-status")
    public ResponseEntity<?> ToggleLikes(@PathVariable Integer videoId, @RequestBody LikeStatusRequestDto likeStatusRequestDto){

        LikeStatusResponseDto likeStatusResponseDto = videoLikeService.toggleLike(videoId,likeStatusRequestDto.getUserId());
        return ResponseEntity.ok(likeStatusResponseDto);
    }



}
