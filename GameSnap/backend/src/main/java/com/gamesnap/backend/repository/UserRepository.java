package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Member,Integer> {

    Member findByEmail(String email);
}
