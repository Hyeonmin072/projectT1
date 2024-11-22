package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
public class FriendRequest {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fr_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fr_fm")
    private Member firstMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fr_sm")
    private Member secondMember;

    protected FriendRequest() {

    }

    public FriendRequest(Member firstMember, Member secondMember) {
        this.firstMember = firstMember;
        this.secondMember = secondMember;
    }
}
