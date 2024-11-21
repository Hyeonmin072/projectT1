package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Video {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    Integer id;

    @Column(name = "v_url")
    String url;

    @Column(name = "v_title")
    String title;

    @Column(name = "v_desc")
    String desc;


    @Column(name = "v_createdate")
    LocalDateTime createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "g_id")
    Game game;

    @Column(name = "v_view")
    Integer view;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    List<VideoComment> videoComments = new ArrayList<>();

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    List<VideoLike> videoLikes = new ArrayList<>();



    public Video(){}

    public Video(String title,String desc,String url,Integer view,Member member,Game game){
        this.title = title;
        this.desc=desc;
        this.url=url;
        this.view=view;
        this.createDate=LocalDateTime.now();
        this.member=member;
        this.game=game;

    }
}
