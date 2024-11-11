package com.gamesnap.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
public class FriendResponseDto {
    private Long id;
    private String name;
    private String status;
    private LocalDateTime lastSeen;
}
