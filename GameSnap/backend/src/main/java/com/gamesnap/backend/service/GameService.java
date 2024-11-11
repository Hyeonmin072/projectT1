package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.GameListDto;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<GameListDto> findAllGames() {
        List<Game> findGames = gameRepository.findAll();
        List<GameListDto> gameListDtos = new ArrayList<>();
        for (Game game : findGames) {
            GameListDto gameListDto = new GameListDto(game.getId(), game.getGenre(), game.getName());
            gameListDtos.add(gameListDto);
        }
        return gameListDtos;
    }
}
