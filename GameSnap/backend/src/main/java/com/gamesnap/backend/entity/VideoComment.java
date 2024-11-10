package com.gamesnap.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter

public class VideoComment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vc_id")
    Integer id;

    @Column(name = "vc_content")
    String content;

    @Column(name = "vc_createdate")
    LocalDateTime createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "v_id")
    Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    Member member;


    protected VideoComment(){

    }

    public VideoComment(String content, Video video, Member member, LocalDateTime createDate){
        this.content = content;
        this.video = video;
        this.member = member;
        this.createDate = createDate;
    }
}
