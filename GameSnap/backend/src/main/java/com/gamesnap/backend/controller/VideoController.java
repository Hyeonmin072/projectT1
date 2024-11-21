package com.gamesnap.backend.controller;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.gamesnap.backend.dto.LikeStatusRequestDto;
import com.gamesnap.backend.dto.LikeStatusResponseDto;
import com.gamesnap.backend.dto.VideoRequestDto;
import com.gamesnap.backend.dto.VideoResponseDto;
import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.repository.VideoLikeRepository;
import com.gamesnap.backend.service.VideoLikeService;
import com.gamesnap.backend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private AmazonS3Client amazonS3Client;
    @Autowired
    private VideoService videoService;
    @Autowired
    private VideoLikeService videoLikeService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file")MultipartFile file,
                                             @RequestParam("userId")Integer userId){


        // 비디오 파일인지 확인
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("video/")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비디오 파일만 업로드 가능합니다.");
        }

        String fileName = file.getOriginalFilename();
        String fileUrl = "https://"+bucket+".s3.ap-northeast-2.amazonaws.com/"+fileName;
        return videoService.uploadFile(file,fileUrl,fileName,userId);

    }

    @PostMapping("/random")
    @Transactional
    public List<VideoResponseDto> getPreferenceVideos(@RequestBody VideoRequestDto videoRequestDto){

        List<Video> videos = videoService.getRandomVideos();

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

    @PostMapping("/preferenceRandom")
    @Transactional
//    public ResponseEntity<String> getRandomVideos(@RequestBody VideoRequestDto videoRequestDto) {
//        return ResponseEntity.status(200).body("됐다");
//    }
    public List<VideoResponseDto> getRandomVideos(@RequestBody VideoRequestDto videoRequestDto) {
        // 랜덤 비디오 목록을 가져옴
        List<Video> videos = videoService.getPreferenceRandomVideos(videoRequestDto.getGamesId());

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
