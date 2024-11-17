package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Friend {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fm_id")
    private Member firstMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sm_id")
    private Member secondMember;

    protected Friend(){

    }

    public Friend(Member firstMember, Member secondMember){
        this.firstMember = firstMember;
        this.secondMember = secondMember;
    }
}
