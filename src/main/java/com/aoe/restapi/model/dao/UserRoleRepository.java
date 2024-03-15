package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.entity.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// entity type and primary key
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
}
