package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    private Set<UserRole> roleSet;

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
    @OneToMany(mappedBy = "user")
    private Set<Issue> issueSet;

    // constructor
    public User() {
    }

    public User(String firstName, String email, String password, Set<UserRole> roleSet, Set<Project> projectSet, Domain domain, Set<Issue> issueSet) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.roleSet = roleSet;
        this.projectSet = projectSet;
        this.domain = domain;
        this.issueSet = issueSet;
    }

    // getter setter
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Project> getProjectSet() {
        return projectSet;
    }

    public void setProjectSet(Set<Project> projectSet) {
        this.projectSet = projectSet;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public Set<Issue> getIssueSet() {
        return issueSet;
    }

    public void setIssueSet(Set<Issue> issueSet) {
        this.issueSet = issueSet;
    }

    public Set<UserRole> getRoleSet() {
        return roleSet;
    }

    public void setRoleSet(Set<UserRole> roleSet) {
        this.roleSet = roleSet;
    }

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
                    .map(UserRole::getId)
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

    // to string
    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roleSet=" + roleSet +
                ", projectSet=" + projectSet +
                ", domain=" + domain +
                ", issueSet=" + issueSet +
                '}';
    }
}
