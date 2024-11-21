package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.MessageRequestDto;
import com.gamesnap.backend.dto.MessageResponseDto;
import com.gamesnap.backend.entity.Message;
import com.gamesnap.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/message") // 클라이언트에서 /pub/message로 전송
    @SendTo("/sub/channel/{roomId}") // 특정 채팅방으로 메시지 브로드캐스트
    public ResponseEntity<MessageResponseDto> sendMessage(@RequestBody MessageRequestDto messageRequestDto) {
        //실시간으로 방에서 채팅
        MessageResponseDto newMessage = messageService.createMessage(messageRequestDto);
        log.info("받은 메시지 : {}", messageRequestDto);

        //방에 있는 모든 사용자에게 메시지 전송
        messagingTemplate.convertAndSend("/sub/channel/"+ messageRequestDto.getMessageRoomId(), newMessage); // /sub/channel/{roomId}를 구독하고 있는 모든 사용자에게 메시지가 전송된다

        return ResponseEntity.ok(newMessage);
    }

    @ResponseBody
    @GetMapping("/messages/{messageRoomId}")
    public ResponseEntity<List<MessageResponseDto>> getMessage(@PathVariable String messageRoomId) {
        return messageService.getMessages(messageRoomId);
    }
}
