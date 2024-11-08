package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.VideoComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoCommentRepository extends JpaRepository<VideoComment, Integer> {

    List<VideoComment> findByVideoIdOrderByCreateDate(Integer videoId);
}
