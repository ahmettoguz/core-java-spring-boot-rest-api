package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

// entity type and primary key
public interface UserRoleRepository extends JpaRepository<Role, Integer> {
}
