package com.gamesnap.backend.dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Getter
public class VideoRequestDto {
    private List<Integer> gamesId;
    private Integer memberId;
}
