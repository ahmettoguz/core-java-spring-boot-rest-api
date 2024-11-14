package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

// entity type and primary key
public interface IssueRepository extends JpaRepository<Issue, Integer> {
}
