package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

// entity type and primary key
public interface DomainRepository extends JpaRepository<Domain, Integer> {
}
