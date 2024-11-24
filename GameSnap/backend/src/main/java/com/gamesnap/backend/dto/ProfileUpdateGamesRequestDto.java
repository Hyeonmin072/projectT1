package com.gamesnap.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProfileUpdateGamesRequestDto {
    private Integer userId;
    private List<Integer> likeGamesId;
}
