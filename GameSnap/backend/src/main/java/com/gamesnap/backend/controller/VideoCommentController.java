package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.VideoCommentRequestDto;
import com.gamesnap.backend.dto.VideoCommentResponseDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.entity.VideoComment;
import com.gamesnap.backend.service.MemberService;
import com.gamesnap.backend.service.VideoCommentService;
import com.gamesnap.backend.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/video")
@Slf4j
public class VideoCommentController {

    @Autowired
    private VideoCommentService videoCommentService;
    @Autowired
    private VideoService videoService;
    @Autowired
    private MemberService memberService;

    @GetMapping("/{videoId}/comments")
    public ResponseEntity<List<VideoCommentResponseDto>> getComments(@PathVariable Integer videoId){
        List<VideoComment> comments = videoCommentService.getCommentsByVideoId(videoId);

        List<VideoCommentResponseDto> response =  comments.stream().map(
                comment -> new VideoCommentResponseDto(
                     comment.getId(),
                     comment.getContent(),
                     comment.getCreateDate(),
                     comment.getMember().getName()
                )).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/addComments")
    public ResponseEntity<VideoCommentResponseDto> addComment(@RequestBody VideoCommentRequestDto videoCommentRequestDto){

        Video video = videoService.findId(videoCommentRequestDto.getVideoId());
        Member member = memberService.findId(videoCommentRequestDto.getMemberId());

        VideoComment comment = new VideoComment(
                videoCommentRequestDto.getContent(),
                video,
                member,
                LocalDateTime.now()
        );
        VideoComment saveVideoComment = videoCommentService.addComment(comment);

        VideoCommentResponseDto response = new VideoCommentResponseDto(
                saveVideoComment.getId(),
                saveVideoComment.getContent(),
                saveVideoComment.getCreateDate(),
                saveVideoComment.getMember().getName()  // 예시로 member의 이름만 전송
        );

        return ResponseEntity.ok(response);
    }
}
