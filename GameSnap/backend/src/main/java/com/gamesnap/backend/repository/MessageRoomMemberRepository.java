package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.MessageRoom;
import com.gamesnap.backend.entity.MessageRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MessageRoomMemberRepository extends JpaRepository<MessageRoomMember, Integer> {

    void deleteByMessageRoom(MessageRoom findMessageRoom);
}
