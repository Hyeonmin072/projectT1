package com.gamesnap.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gamesnap.backend.dto.ProfileResponseDto;
import com.gamesnap.backend.entity.Profile;
import com.gamesnap.backend.repository.ProfileRepository;
import com.gamesnap.backend.service.ProfileService;



@Controller
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private ProfileRepository repository;

    @GetMapping("/getProfile")
    public ProfileResponseDto getProfile(@RequestParam Integer id) {
        return profileService.getProfileId(id);
    }

    @PostMapping("/updateProfile")
    public ProfileResponseDto updateProfile(@RequestBody ProfileResponseDto responseDto) {
        Profile profile = repository.findById(responseDto.getId())
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        // 프로필 정보 업데이트
        profile.setEmail(responseDto.getEmail());
        profile.setTel(responseDto.getTel());
        profile.setGenres(responseDto.getGenres());
        profile.setPassword(responseDto.getPassword());

        // 업데이트된 프로필 저장
        repository.save(profile);

        // 업데이트 후 ProfileResponseDto로 변환하여 반환
        return new ProfileResponseDto(
            profile.getId(),
            profile.getImage(),
            profile.getName(),
            profile.getEmail(),
            profile.getTel(),
            profile.getGenres(),
            profile.getPassword()
        );
    }
    
    
}
