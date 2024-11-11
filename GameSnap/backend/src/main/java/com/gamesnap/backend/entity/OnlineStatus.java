package com.gamesnap.backend.entity;

// OnlineStatus.java
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "online_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OnlineStatus {
    @Id
    private Long memberId;  // Member의 ID를 그대로 사용

    @Column(name = "is_online")
    private boolean isOnline;  // 현재 온라인 상태

    @Column(name = "last_seen")
    private LocalDateTime lastSeen;  // 마지막 접속 시간

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "member_id")
    private Member member;

    @PreUpdate
    protected void onUpdate() {
        if (!isOnline) {
            lastSeen = LocalDateTime.now();
        }
    }
}