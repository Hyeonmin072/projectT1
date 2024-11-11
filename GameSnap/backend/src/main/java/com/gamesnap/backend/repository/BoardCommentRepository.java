package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardComment;
import com.gamesnap.backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Integer> {
    List<BoardComment> findByBoard(Board board);
}
