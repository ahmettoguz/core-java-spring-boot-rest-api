package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

// entity type and primary key
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
