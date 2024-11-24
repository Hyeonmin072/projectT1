package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.MemberResponseDto;
import com.gamesnap.backend.dto.MessageRoomRequestDto;
import com.gamesnap.backend.dto.MessageRoomResponseDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.MessageRoom;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.repository.MessageRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageRoomService {
    private final MessageRoomRepository messageRoomRepository;
    private final MemberRepository memberRepository;

    //1대1 채팅방 생성
    public MessageRoomResponseDto createMessageRoomForPersonal(MessageRoomRequestDto request) {
        Optional<Member> optionalMaker = memberRepository.findById(request.getMakerId());
        Optional<Member> optionalGuest = memberRepository.findById(request.getGuestId());
        if (optionalMaker.isEmpty() || optionalGuest.isEmpty()) {
            throw new IllegalStateException("멤버 조회 중 오류 발생");
        }
        Member maker = optionalMaker.get();
        Member guest = optionalGuest.get();

        MessageRoom newMessageRoom = MessageRoom.create();
        newMessageRoom.addMembers(maker, guest);

        messageRoomRepository.save(newMessageRoom);

        return new MessageRoomResponseDto(
                maker.getId(),
                guest.getId(),
                newMessageRoom.getId(),
                ""
        );
    }

    public ResponseEntity<String> checkSameRoom(Integer makerId, Integer guestId) {
        Optional<MessageRoom> findRoom = messageRoomRepository.findByMembers(makerId, guestId);

        if (findRoom.isPresent()) { // 이미 있을때
            return ResponseEntity.ok(findRoom.get().getId());
        } else { // 없을때
            return ResponseEntity.ok("해당 멤버들로 개설된 채팅방을 찾을 수 없습니다.");
        }
    }

    public ResponseEntity<List<MessageRoomResponseDto>> getMessageRooms(Integer memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<MessageRoom> findMessageRooms = messageRoomRepository.findByOneMember(memberId);
        List<MessageRoomResponseDto> messageRoomResponseDtos = new ArrayList<>();







        for (MessageRoom messageRoom : findMessageRooms) {
            MessageRoomResponseDto messageRoomResponseDto = getMessageRoomResponseDto(messageRoom);
            messageRoomResponseDtos.add(messageRoomResponseDto);
        }

        return ResponseEntity.ok(messageRoomResponseDtos);
    }

    private MessageRoomResponseDto getMessageRoomResponseDto(MessageRoom messageRoom) {
        MessageRoomResponseDto messageRoomResponseDto;
        if (messageRoom.getLastMsg() == null) {
            messageRoomResponseDto = new MessageRoomResponseDto(
                    messageRoom.getMessageRoomMembers().get(0).getId(),
                    messageRoom.getMessageRoomMembers().get(1).getId(),
                    messageRoom.getId(),
                    ""
            );
        } else {
            messageRoomResponseDto = new MessageRoomResponseDto(
                    messageRoom.getMessageRoomMembers().get(0).getId(),
                    messageRoom.getMessageRoomMembers().get(1).getId(),
                    messageRoom.getId(),
                    messageRoom.getLastMsg().getContent()
            );
        }
        return messageRoomResponseDto;
    }
}
