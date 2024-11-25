package com.gamesnap.backend.repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gamesnap.backend.entity.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface MemberRepository extends JpaRepository<Member,Integer> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByName(String name);
    Optional<Member> findById(Integer id);
    @Query("select m from Member m where m.name like %:name% and m.id not in (select f.secondMember.id from Friend f where f.firstMember.id = :myId) and m.id not in (select fr.receiver.id from FriendRequest fr where fr.sender.id = :myId)")
    List<Member> findByNameContainingAndNotFriends(@Param("name") String name, @Param("myId") Integer myId);
}
