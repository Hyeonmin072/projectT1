package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardLike;
import com.gamesnap.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Integer> {
    Optional<BoardLike> findBoardLikeByMemberAndBoard(Member member, Board board);

    void deleteByBoard(Board board);
}
