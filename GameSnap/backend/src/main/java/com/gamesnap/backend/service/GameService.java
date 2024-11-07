package com.gamesnap.backend.service;

import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> findAllGames() {
        return gameRepository.findAll();
    }
}
