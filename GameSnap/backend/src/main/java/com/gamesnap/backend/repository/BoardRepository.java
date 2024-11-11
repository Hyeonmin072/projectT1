package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    List<Board> findByGame(Game game);
    Optional<Board> findByTitle(String title);
}
