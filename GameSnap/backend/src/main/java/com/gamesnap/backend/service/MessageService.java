package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.MessageRequestDto;
import com.gamesnap.backend.dto.MessageResponseDto;
import com.gamesnap.backend.dto.MessageRoomResponseDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.Message;
import com.gamesnap.backend.entity.MessageRoom;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.repository.MessageRepository;
import com.gamesnap.backend.repository.MessageRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRoomRepository messageRoomRepository;
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;

    public MessageResponseDto createMessage(MessageRequestDto messageRequestDto) {
        Optional<MessageRoom> optionalMessageRoom = messageRoomRepository.findById(messageRequestDto.getMessageRoomId());
        Optional<Member> optionalMember = memberRepository.findById(messageRequestDto.getMemberId());

        if (optionalMessageRoom.isEmpty() || optionalMember.isEmpty()) {
            throw new IllegalStateException("조회 중 오류 발생");
        }
        
        MessageRoom messageRoom = optionalMessageRoom.get();
        Member member = optionalMember.get();

        Message message = new Message(messageRequestDto.getContent(), messageRoom, member);
        messageRepository.save(message);
        messageRoom.changeLastMsg(message);

        return new MessageResponseDto(
                message.getId(),
                message.getContent(),
                message.getCreatedAt(),
                message.getMessageRoom().getId(),
                message.getMember().getId());
    }

    public ResponseEntity<List<MessageResponseDto>> getMessages(String messageRoomId) {
        Optional<MessageRoom> optionalMessageRoom = messageRoomRepository.findById(messageRoomId);
        if (optionalMessageRoom.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        MessageRoom messageRoom = optionalMessageRoom.get();
        List<Message> messages = messageRepository.findByMessageRoom(messageRoom);

        List<MessageResponseDto> messageResponseDtos = new ArrayList<>();
        for (Message message : messages) {
            MessageResponseDto messageResponseDto = new MessageResponseDto(message.getId(), message.getContent(), message.getCreatedAt(), message.getMessageRoom().getId(), message.getMember().getId());
            messageResponseDtos.add(messageResponseDto);
        }

        return ResponseEntity.ok().body(messageResponseDtos);
    }
}
