package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Integer> {
    Optional<Game> findById(Integer Id);
    Optional<Game> findByName(String name);
}
