package com.gamesnap.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
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
}
