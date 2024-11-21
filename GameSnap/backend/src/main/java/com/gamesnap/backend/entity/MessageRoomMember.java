package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class MessageRoomMember {

    @Id @GeneratedValue
    @Column(name="msrm_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "msrm_msr")
    private MessageRoom messageRoom;

    @ManyToOne
    @JoinColumn(name ="msrm_member")
    private Member member;

    public MessageRoomMember(MessageRoom messageRoom, Member member) {
        this.messageRoom = messageRoom;
        this.member = member;
    }
}
