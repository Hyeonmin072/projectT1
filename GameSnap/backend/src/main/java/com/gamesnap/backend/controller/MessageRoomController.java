package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.MessageRoomRequestDto;
import com.gamesnap.backend.dto.MessageRoomResponseDto;
import com.gamesnap.backend.dto.MessageRoomSearchDto;
import com.gamesnap.backend.repository.MessageRepository;
import com.gamesnap.backend.repository.MessageRoomRepository;
import com.gamesnap.backend.service.MessageRoomService;
import com.gamesnap.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageRoomController {
    private final MessageRoomService messageRoomService;


    @PostMapping("/personal") //1대1 채팅방 개설 API
    public MessageRoomResponseDto createMessageRoom(@RequestBody MessageRoomRequestDto request) {
        return messageRoomService.createMessageRoomForPersonal(request);
    }

    @GetMapping("/checkMessageRoom") // 해당 멤버들로 채팅방이 이미 만들어져있는지 확인하는 API
    public ResponseEntity<String> checkMessageRoom(@RequestParam Integer makerId, @RequestParam Integer guestId) {
        return messageRoomService.checkSameRoom(makerId, guestId);
    }

    @GetMapping("/{memberId}/messageRooms") // 해당 멤버의 개설된 채팅방들을 가져오는 API
    public ResponseEntity<List<MessageRoomSearchDto>> getMessageRooms(@PathVariable Integer memberId) {
        return messageRoomService.getMessageRooms(memberId);
    }
}
