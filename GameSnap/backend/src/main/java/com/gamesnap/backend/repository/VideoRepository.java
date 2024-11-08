package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video,Integer> {

}
