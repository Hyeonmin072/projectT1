package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Integer> {
}
