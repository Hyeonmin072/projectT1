package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

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
    String createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "v_id")
    Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    Member member;

    protected VideoComment() {
    }


}
