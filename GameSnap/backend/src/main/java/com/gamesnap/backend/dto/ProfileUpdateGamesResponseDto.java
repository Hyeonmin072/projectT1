package com.gamesnap.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProfileUpdateGamesResponseDto {
    private List<Integer> likeGamesId;
    private List<String> likeGamesName;

    public ProfileUpdateGamesResponseDto(){}

    public ProfileUpdateGamesResponseDto(List<Integer> likeGamesId,List<String> likeGamesName){
        this.likeGamesId = likeGamesId;
        this.likeGamesName = likeGamesName;
    }
}
