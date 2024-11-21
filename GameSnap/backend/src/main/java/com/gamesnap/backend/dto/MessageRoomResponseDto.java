package com.gamesnap.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRoomResponseDto {
    private Integer makerId;
    private Integer guestId;
    private String messageRoomId;
    private String lastMsg;
}
