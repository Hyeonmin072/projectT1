package com.gamesnap.backend.service;

import com.gamesnap.backend.entity.VideoComment;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.repository.VideoCommentRepository;
import com.gamesnap.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoCommentService {

    @Autowired
    private VideoCommentRepository videoCommentRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private MemberRepository memberRepository;

    public List<VideoComment> getCommentsByVideoId(Integer videoId){
        return videoCommentRepository.findByVideoIdOrderByCreateDate(videoId);
    }

    public VideoComment addComment(VideoComment comment){

        return videoCommentRepository.save(comment);
    }
}
