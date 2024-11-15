package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.MemberGame;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberGameRepository extends JpaRepository<MemberGame,Integer> {
    Optional<MemberGame> findByGame(Game Game);
}
