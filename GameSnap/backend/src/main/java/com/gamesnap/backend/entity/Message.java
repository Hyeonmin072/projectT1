package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Message {

    @Id @GeneratedValue
    @Column(name = "ms_id")
    private Long id;

    @Column(name = "ms_content")
    private String content;

    @Column(name = "ms_created_at", updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ms_room_id")
    private MessageRoom messageRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ms_member_id")
    private Member member;

    public Message(String content, MessageRoom messageRoom, Member member) {
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.messageRoom = messageRoom;
        this.member = member;
    }
}
