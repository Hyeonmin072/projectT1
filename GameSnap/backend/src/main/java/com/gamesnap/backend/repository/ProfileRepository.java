package com.gamesnap.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamesnap.backend.entity.Profile;


public interface  ProfileRepository extends JpaRepository<Profile, Integer>{
    Optional<Profile> findById(Integer id);
}
