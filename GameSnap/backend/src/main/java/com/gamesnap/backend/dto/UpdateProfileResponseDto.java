package com.gamesnap.backend.dto;

import lombok.Data;

import java.util.List;


@Data
public class UpdateProfileResponseDto {
    private String name;
    private String content;
    private List<Integer> likeGamesId;
    private List<String> likeGamesName;

    public UpdateProfileResponseDto(String name, String content, List<Integer> likeGamesId, List<String> likeGamesName){
        this.name = name;
        this.content = content;
        this.likeGamesId = likeGamesId;
        this.likeGamesName = likeGamesName;

    }
}
