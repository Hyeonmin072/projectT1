package com.gamesnap.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardSaveDto {

    private String title;

    private String content;

    private Integer userId;

    private Integer gameId;
}
