package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.VideoLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoLikeRepository extends JpaRepository<VideoLike,Integer> {
    Optional<VideoLike> findByVideoIdAndMemberId(Integer VideoId,Integer MemberId);
}
