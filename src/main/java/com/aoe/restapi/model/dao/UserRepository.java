package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// entity type and primary key
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    Page<User> findByFirstName(String exactFirstName, Pageable pageable);

    Page<User> findByFirstNameContaining(String partialFirstName, Pageable pageable);
}
