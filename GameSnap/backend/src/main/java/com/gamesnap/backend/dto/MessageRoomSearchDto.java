package com.gamesnap.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRoomSearchDto {
    private Integer partnerId;
    private String partnerName;
    private String lastMsg;
}
