package com.gamesnap.backend.entity;


import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class VideoLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vl_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id" , nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "v_id", nullable = false)
    private Video video;

    public VideoLike(){

    }

    public VideoLike(Member member, Video video){
        this.member = member;
        this.video = video;
    }
}
