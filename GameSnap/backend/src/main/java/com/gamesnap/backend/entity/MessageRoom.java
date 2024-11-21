package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.annotation.processing.Messager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class MessageRoom {

    @Id
    @Column(name = "msr_id")
    private String id = UUID.randomUUID().toString();

    //단방향
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "msr_lastmsg")
    private Message lastMsg;

    @Column(name = "msr_created_at",updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "messageRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MessageRoomMember> messageRoomMembers = new ArrayList<>();

    public static MessageRoom create() {
        return new MessageRoom();
    }

    public void changeLastMsg(Message lastMsg) {
        this.lastMsg = lastMsg;
    }

    public void addMembers(Member maker, Member guest) {
        MessageRoomMember makerMember = new MessageRoomMember(this, maker);
        MessageRoomMember guestMember = new MessageRoomMember(this, guest);

        messageRoomMembers.add(makerMember);
        messageRoomMembers.add(guestMember);
    }
}
