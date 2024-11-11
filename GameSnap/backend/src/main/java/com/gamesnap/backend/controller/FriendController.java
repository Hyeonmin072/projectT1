package com.gamesnap.backend.controller;

// FriendController.java
import com.gamesnap.backend.dto.FriendRequestDto;
import com.gamesnap.backend.dto.FriendResponseDto;
import com.gamesnap.backend.dto.MemberSearchResponseDto;
import com.gamesnap.backend.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    // 친구 목록 조회
    @GetMapping("/friends")
    public ResponseEntity<List<FriendResponseDto>> getFriends(
            @RequestAttribute Long userId
    ) {
        return ResponseEntity.ok(friendService.getFriendsList(userId));
    }

    // 사용자 검색
    @GetMapping("/users/search")
    public ResponseEntity<List<MemberSearchResponseDto>> searchUsers(
            @RequestParam String nickname,
            @RequestAttribute Long userId
    ) {
        return ResponseEntity.ok(friendService.searchUsers(nickname, userId));
    }

    // 친구 요청 보내기
    @PostMapping("/friends/request")
    public ResponseEntity<Void> sendFriendRequest(
            @RequestAttribute Long userId,
            @RequestBody Long targetUserId
    ) {
        friendService.sendFriendRequest(userId, targetUserId);
        return ResponseEntity.ok().build();
    }

    // 친구 요청 수락
    @PostMapping("/friends/request/{requestId}/accept")
    public ResponseEntity<Void> acceptFriendRequest(
            @PathVariable Long requestId,
            @RequestAttribute Long userId
    ) {
        friendService.acceptFriendRequest(requestId, userId);
        return ResponseEntity.ok().build();
    }

    // 친구 요청 거절
    @PostMapping("/friends/request/{requestId}/reject")
    public ResponseEntity<Void> rejectFriendRequest(
            @PathVariable Long requestId,
            @RequestAttribute Long userId
    ) {
        friendService.rejectFriendRequest(requestId, userId);
        return ResponseEntity.ok().build();
    }

    // 친구 삭제
    @DeleteMapping("/friends/{friendId}")
    public ResponseEntity<Void> removeFriend(
            @PathVariable Long friendId,
            @RequestAttribute Long userId
    ) {
        friendService.removeFriend(userId, friendId);
        return ResponseEntity.ok().build();
    }

    // 친구 요청 목록 조회
    @GetMapping("/friends/requests")
    public ResponseEntity<List<FriendRequestDto>> getPendingRequests(
            @RequestAttribute Long userId
    ) {
        return ResponseEntity.ok(friendService.getPendingRequests(userId));
    }
}