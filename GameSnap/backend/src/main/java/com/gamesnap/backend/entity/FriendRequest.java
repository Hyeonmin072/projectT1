package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class FriendRequest {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fr_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fr_sender")
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fr_receiver")
    private Member receiver;

    protected FriendRequest() {

    }

    public FriendRequest(Member sender, Member receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }
}
