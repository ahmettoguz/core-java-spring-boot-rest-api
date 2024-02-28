package com.aoe.restapi.model.entity;

import com.aoe.restapi.controller.base.Identifiable;
import com.aoe.restapi.model.service.Activatable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User implements Activatable, Identifiable {
    // fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "email")
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;

    @Column(name = "is_active")
    private Boolean isActive;

    // relational field
    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "users_projects",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "project_id")})
    private Set<Project> projectSet = new HashSet<Project>();

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domain_id")
    private Domain domain;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Issue> issueList;

    // constructor
    public User() {
    }

    public User(Integer id, String firstName, String email, String password, Boolean isActive, Set<Project> projectSet, Domain domain, List<Issue> issueList) {
        this.id = id;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.projectSet = projectSet;
        this.domain = domain;
        this.issueList = issueList;
    }

    // getter setter
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

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

    @JsonProperty("isActive")
    public Boolean getActive() {
        return isActive;
    }

    @Override
    public void setActive(Boolean active) {
        isActive = active;
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

    public List<Issue> getIssueList() {
        return issueList;
    }

    public void setIssueList(List<Issue> issueList) {
        this.issueList = issueList;
    }

    // relational getter and setter
    public List<Integer> getProjectIds() {
        return projectSet.stream()
                .map(Project::getId)
                .collect(Collectors.toList());
    }

    // to string
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", isActive=" + isActive +
                ", projectSet=" + projectSet +
                ", domain=" + domain +
                ", issueList=" + issueList +
                '}';
    }
}
