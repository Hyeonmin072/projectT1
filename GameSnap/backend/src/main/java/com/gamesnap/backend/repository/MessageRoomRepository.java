package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.MessageRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MessageRoomRepository extends JpaRepository<MessageRoom, Integer> {
    Optional<MessageRoom> findById(String roomId);

    @Query("select msr from MessageRoom msr join msr.messageRoomMembers msrm1 join msr.messageRoomMembers msrm2 where (msrm1.member.id = :makerId and msrm2.member.id = :guestId) or (msrm1.member.id = :guestId and msrm2.member.id = :makerId)")
    Optional<MessageRoom> findByMembers(@Param("makerId") Integer makerId,@Param("guestId") Integer guestId);


    @Query("select msr from MessageRoom msr join msr.messageRoomMembers msrm where msrm.member.id = :memberId")
    List<MessageRoom> findByOneMember(@Param("memberId") Integer memberId);
}
