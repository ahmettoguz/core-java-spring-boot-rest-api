package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// entity type and primary key
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    List<User> findByFirstName(String firstName);
}
