package com.gamesnap.backend.repository;

import com.gamesnap.backend.entity.OnlineStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface OnlineStatusRepository extends JpaRepository<OnlineStatus, Long> {
    List<OnlineStatus> findByMemberIdIn(Collection<Long> memberIds);
}
