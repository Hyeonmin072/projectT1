package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.FriendRequestDto;
import com.gamesnap.backend.dto.FriendResponseDto;
import com.gamesnap.backend.dto.MemberSearchResponseDto;
import com.gamesnap.backend.entity.Friend;
import com.gamesnap.backend.entity.FriendStatus;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.entity.OnlineStatus;
import com.gamesnap.backend.repository.FriendRepository;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.repository.OnlineStatusRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FriendService {
    private final FriendRepository friendRepository;
    private final OnlineStatusRepository onlineStatusRepository;
    private final MemberRepository memberRepository;

    /**
     * 친구 목록 조회
     * - 친구 상태가 ACCEPTED인 모든 친구를 조회
     * - 각 친구의 온라인 상태도 함께 조회
     */
    public List<FriendResponseDto> getFriendsList(Long userId) {
        try {
            // 1. 모든 친구 관계 조회
            List<Friend> friends = friendRepository.findAllFriendsByUserId(userId);

            // 2. 친구들의 ID 목록 추출
            List<Long> friendIds = friends.stream()
                    .map(f -> f.getRequester().getId().equals(userId)
                            ? f.getAddressee().getId()
                            : f.getRequester().getId()
                    )
                    .map(Long::valueOf)  // 명시적으로 Long으로 변환
                    .collect(Collectors.toList());

            // 3. 친구들의 온라인 상태 조회
            List<OnlineStatus> onlineStatuses = onlineStatusRepository.findByMemberIdIn(friendIds);
            Map<Long, OnlineStatus> statusMap = onlineStatuses.stream()
                    .collect(Collectors.toMap(OnlineStatus::getMemberId, s -> s));

            // 4. DTO 변환
            return friends.stream().map(friend -> {
                Member friendMember = friend.getRequester().getId().equals(userId) ?
                        friend.getAddressee() : friend.getRequester();
                OnlineStatus status = statusMap.get(friendMember.getId());

                return FriendResponseDto.builder()
                        .id(Long.valueOf(friendMember.getId()))
                        .name(friendMember.getName())
                        .status(status != null && status.isOnline() ? "온라인" : "오프라인")
                        .lastSeen(status != null ? status.getLastSeen() : null)
                        .build();
            }).collect(Collectors.toList());

        } catch (Exception e) {
            log.error("친구 목록 조회 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("친구 목록을 가져오는데 실패했습니다.", e);
        }
    }

    /**
     * 사용자 검색
     * - 닉네임으로 사용자 검색
     * - 현재 사용자는 제외
     */
    public List<MemberSearchResponseDto> searchUsers(String nickname, Long currentUserId) {
        try {
            List<Member> members = (List<Member>) memberRepository.findByNicknameContaining(nickname);
            return members.stream()  // List를 Stream으로 변환
                    .filter(member -> !member.getId().equals(currentUserId))
                    .map(member -> MemberSearchResponseDto.builder()
                            .id(Long.valueOf(member.getId()))
                            .name(member.getName())
                            .build())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("사용자 검색 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("사용자 검색에 실패했습니다.", e);
        }
    }

    /**
     * 친구 요청 보내기
     * - 이미 존재하는 친구 관계 체크
     * - 자기 자신에게 요청 불가
     */
    @Transactional
    public void sendFriendRequest(Long requesterId, Long addresseeId) {
        try {
            // 자기 자신에게 요청하는 경우 체크
            if (requesterId.equals(addresseeId)) {
                throw new IllegalArgumentException("자기 자신에게 친구 요청을 보낼 수 없습니다.");
            }

            // 이미 친구 관계가 있는지 확인
            if (friendRepository.findFriendRelationship(requesterId, addresseeId).isPresent()) {
                throw new IllegalStateException("이미 친구이거나 친구 요청이 존재합니다.");
            }

            Member requester = memberRepository.findById(Math.toIntExact(requesterId))
                    .orElseThrow(() -> new EntityNotFoundException("요청자를 찾을 수 없습니다."));
            Member addressee = memberRepository.findById(Math.toIntExact(addresseeId))
                    .orElseThrow(() -> new EntityNotFoundException("수신자를 찾을 수 없습니다."));

            Friend friendRequest = Friend.builder()
                    .requester(requester)
                    .addressee(addressee)
                    .status(FriendStatus.PENDING)
                    .build();

            friendRepository.save(friendRequest);
            log.info("친구 요청이 성공적으로 생성되었습니다. Requester: {}, Addressee: {}", requesterId, addresseeId);

        } catch (Exception e) {
            log.error("친구 요청 생성 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * 친구 요청 수락
     */
    @Transactional
    public void acceptFriendRequest(Long requestId, Long userId) {
        try {
            Friend request = friendRepository.findById(requestId)
                    .orElseThrow(() -> new EntityNotFoundException("친구 요청을 찾을 수 없습니다."));

            if (!request.getAddressee().getId().equals(userId)) {
                throw new IllegalStateException("친구 요청을 수락할 권한이 없습니다.");
            }

            request.setStatus(FriendStatus.ACCEPTED);
            friendRepository.save(request);
            log.info("친구 요청이 성공적으로 수락되었습니다. RequestId: {}", requestId);

        } catch (Exception e) {
            log.error("친구 요청 수락 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * 친구 요청 거절
     */
    @Transactional
    public void rejectFriendRequest(Long requestId, Long userId) {
        try {
            Friend request = friendRepository.findById(requestId)
                    .orElseThrow(() -> new EntityNotFoundException("친구 요청을 찾을 수 없습니다."));

            if (!request.getAddressee().getId().equals(userId)) {
                throw new IllegalStateException("친구 요청을 거절할 권한이 없습니다.");
            }

            request.setStatus(FriendStatus.REJECTED);
            friendRepository.save(request);
            log.info("친구 요청이 성공적으로 거절되었습니다. RequestId: {}", requestId);

        } catch (Exception e) {
            log.error("친구 요청 거절 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * 친구 삭제
     */
    @Transactional
    public void removeFriend(Long userId, Long friendId) {
        try {
            Friend friendship = friendRepository.findFriendRelationship(userId, friendId)
                    .orElseThrow(() -> new EntityNotFoundException("친구 관계를 찾을 수 없습니다."));

            friendRepository.delete(friendship);
            log.info("친구 관계가 성공적으로 삭제되었습니다. User: {}, Friend: {}", userId, friendId);

        } catch (Exception e) {
            log.error("친구 삭제 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * 친구 요청 목록 조회
     * - 상태가 PENDING인 요청만 조회
     */
    public List<FriendRequestDto> getPendingRequests(Long userId) {
        try {
            return friendRepository.findPendingFriendRequestsByUserId(userId).stream()
                    .map(request -> FriendRequestDto.builder()
                            .id(request.getId())
                            .senderName(request.getRequester().getName())
                            .senderId(Long.valueOf(request.getRequester().getId()))
                            .sentAt(request.getCreatedAt())
                            .build())
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("친구 요청 목록 조회 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("친구 요청 목록을 가져오는데 실패했습니다.", e);
        }
    }
}