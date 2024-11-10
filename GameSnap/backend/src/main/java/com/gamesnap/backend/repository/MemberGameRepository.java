package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.MemberGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberGameRepository extends JpaRepository<MemberGame,Integer> {

}
