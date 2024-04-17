package com.aoe.restapi.model.dao;

import com.aoe.restapi.model.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

// entity type and primary key
public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
