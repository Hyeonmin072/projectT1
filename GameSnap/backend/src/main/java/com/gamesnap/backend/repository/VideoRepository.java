package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video,Integer> {

    List<Video> findByGame(Game game);
    Optional<Video> findByTitle(String name);
    List<Video> findAllByMember(Member member);
}
