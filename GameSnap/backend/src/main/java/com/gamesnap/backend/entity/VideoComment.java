package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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


<<<<<<< HEAD
=======

    protected VideoComment(){

    }
>>>>>>> 99d67ceb0d98376bdd3738f941ad9b253a543d35
    public VideoComment(String content, Video video, Member member, LocalDateTime createDate){
        this.content = content;
        this.video = video;
        this.member = member;
        this.createDate = createDate;
    }
<<<<<<< HEAD
=======

>>>>>>> 99d67ceb0d98376bdd3738f941ad9b253a543d35
}
