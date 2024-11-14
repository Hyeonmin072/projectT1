package com.gamesnap.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamesnap.backend.dto.ProfileResponseDto;
import com.gamesnap.backend.entity.Profile;
import com.gamesnap.backend.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository repository;

    public ProfileResponseDto getProfileId(Integer id) {
        Profile profile = repository.findById(id).orElseThrow(() -> new RuntimeException("Profile not found"));

        return new ProfileResponseDto(
            profile.getId(), 
            profile.getImage(),
            profile.getName(), 
            profile.getEmail(), 
            profile.getTel(), 
            profile.getGenres(), 
            profile.getPassword());
    }

    
}
