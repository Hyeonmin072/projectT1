package com.gamesnap.backend.Repository;

import com.gamesnap.backend.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Member,Integer> {

    Member findByEmail(String email);
}
