package com.gamesnap.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class FriendRequestDto {
    private Long id;
    private String senderName;
    private Long senderId;
    private LocalDateTime sentAt;
}