package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Message {
    @Id @GeneratedValue
    @Column(name = "ms_id")
    private int id;

    @Column(name = "ms_content")
    private String content;

    @Column(name = "ms_createdate")
    private LocalDateTime createdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "send_id")
    private Member sendMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receive_id")
    private Member receiveMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "msr_id")
    private MessageRoom messageRoom;

    protected Message() {
    }

    public Message(String content, LocalDateTime createdate, Member sendMember, Member receiveMember, MessageRoom messageRoom) {
        this.content = content;
        this.createdate = LocalDateTime.now();
        this.sendMember = sendMember;
        this.receiveMember = receiveMember;
        this.messageRoom = messageRoom;
    }
}
