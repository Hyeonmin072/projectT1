package com.gamesnap.backend.service;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final GameRepository gameRepository;

    public List<Board> findBoards(Integer gameId) {
        Optional<Game> findResult = gameRepository.findById(gameId);
        if (findResult.isPresent()) {
            Game findGame = findResult.get();
            return boardRepository.findByGame(findGame);
        }
        return List.of();
    }
}
