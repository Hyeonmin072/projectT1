package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Message;
import com.gamesnap.backend.entity.MessageRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findByMessageRoom(MessageRoom messageRoom);
}
