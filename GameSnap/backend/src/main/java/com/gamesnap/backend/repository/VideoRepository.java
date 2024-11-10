package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video,Integer> {

    List<Video> findByGame(Game game);
}
