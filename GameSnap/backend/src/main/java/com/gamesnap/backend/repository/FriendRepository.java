package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("SELECT f FROM Friend f WHERE " +
            "(f.requester.id = :userId OR f.addressee.id = :userId) " +
            "AND f.status = 'ACCEPTED'")
    List<Friend> findAllFriendsByUserId(@Param("userId") Long userId);

    @Query("SELECT f FROM Friend f WHERE " +
            "f.addressee.id = :userId AND f.status = 'PENDING'")
    List<Friend> findPendingFriendRequestsByUserId(@Param("userId") Long userId);

    @Query("SELECT f FROM Friend f WHERE " +
            "(f.requester.id = :user1Id AND f.addressee.id = :user2Id) OR " +
            "(f.requester.id = :user2Id AND f.addressee.id = :user1Id)")
    Optional<Friend> findFriendRelationship(
            @Param("user1Id") Long user1Id,
            @Param("user2Id") Long user2Id
    );
}