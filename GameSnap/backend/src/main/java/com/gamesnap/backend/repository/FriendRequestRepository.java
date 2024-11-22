package com.gamesnap.backend.repository;

import com.gamesnap.backend.dto.MemberSimpleDto;
import com.gamesnap.backend.entity.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {

    @Query("select fr from FriendRequest fr join fetch fr.sender frs join fetch fr.receiver frr where frs.id = :senderId and frr.id = :receiverId")
    Optional<FriendRequest> findBySenderAndReceiver(@Param("senderId") Integer senderId, @Param("receiverId") Integer receiverId);

    @Query("select new com.gamesnap.backend.dto.MemberSimpleDto(frs.id, frs.name) from FriendRequest fr join fr.receiver frr join fr.sender frs where frr.id = :memberId")
    List<MemberSimpleDto> findByReceiverId(@Param("memberId") Integer myId);
}
