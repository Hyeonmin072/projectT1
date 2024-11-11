package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.LikeStatusResponseDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.Video;
import com.gamesnap.backend.entity.VideoLike;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.repository.VideoLikeRepository;
import com.gamesnap.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VideoLikeService {
    @Autowired
    private VideoLikeRepository videoLikeRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private VideoRepository videoRepository;
    public LikeStatusResponseDto toggleLike(Integer videoId, Integer memberId){
        Optional<VideoLike> findVideoLike = videoLikeRepository.findByVideoIdAndMemberId(videoId,memberId);
        Optional<Member> findMember = memberRepository.findById(memberId);
        Optional<Video> findVideo = videoRepository.findById(videoId);
        Member member = findMember.get();
        Video video = findVideo.get();

        if(findVideoLike.isPresent()){
            videoLikeRepository.delete(findVideoLike.get());
        }else{
            VideoLike newVideoLike = new VideoLike(member,video);
            videoLikeRepository.save(newVideoLike);
        }

        boolean isLiked = !findVideoLike.isPresent();
        int likes = video.getVideoLikes().size();
        return new LikeStatusResponseDto(isLiked,likes);
    }

    public boolean LikeStatus(Integer videoId,Integer memberId){
        Optional<VideoLike> findVideoLike =  videoLikeRepository.findByVideoIdAndMemberId(videoId,memberId);
        return findVideoLike.isPresent();
    }
}
