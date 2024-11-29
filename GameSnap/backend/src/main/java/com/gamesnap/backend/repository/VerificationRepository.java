package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface VerificationRepository extends JpaRepository<VerificationCode,Long> {
    Optional<VerificationCode> findByEmailAndCode(String email,String code);
    void deleteByExpiresTimeBefore(LocalDateTime expiresTime);
}
