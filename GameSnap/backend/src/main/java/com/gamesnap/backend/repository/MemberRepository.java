package com.gamesnap.backend.repository;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.gamesnap.backend.entity.Member;

@EnableJpaRepositories
public interface MemberRepository extends JpaRepository<Member,Integer> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByName(String name);
    Optional<Member> findById(Integer id);

    Arrays findByNicknameContaining(String nickname);
}
