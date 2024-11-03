package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Integer> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByName(String name);
}
