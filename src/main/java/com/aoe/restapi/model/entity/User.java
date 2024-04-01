package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    // fields
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "email")
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;

    // relational field
    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "users_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> roleSet;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "users_projects",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "project_id")})
    private Set<Project> projectSet;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domain_id")
    private Domain domain;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<Issue> issueSet;

    // relational getter
    public List<Integer> getProjectIds() {
        if (projectSet == null)
            return null;
        else {
            return projectSet.stream()
                    .map(Project::getId)
                    .collect(Collectors.toList());
        }
    }

    public List<Integer> getRoleIds() {
        if (roleSet == null)
            return null;
        else {
            return roleSet.stream()
                    .map(Role::getId)
                    .collect(Collectors.toList());
        }
    }

    public List<Integer> getIssueIds() {
        if (issueSet == null)
            return null;
        else {
            return issueSet.stream()
                    .map(Issue::getId)
                    .collect(Collectors.toList());
        }
    }
}
