package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Page<Board> findByGame(Game game, Pageable pageable);
    Optional<Board> findByTitle(String title);
}
