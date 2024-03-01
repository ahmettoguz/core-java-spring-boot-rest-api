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
@Table(name = "projects")
public class Project implements Activatable, Identifiable {
    // fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "progress")
    private Integer progress;

    @Column(name = "is_active")
    private Boolean isActive;

    // relational field
    @JsonIgnore
    @ManyToMany(mappedBy = "projectSet", cascade = {CascadeType.ALL})
    private Set<User> userSet = new HashSet<>();

    // constructor
    public Project() {
    }

    public Project(Integer id, String title, Integer progress, Boolean isActive, Set<User> userSet) {
        this.id = id;
        this.title = title;
        this.progress = progress;
        this.isActive = isActive;
        this.userSet = userSet;
    }

    // getter setter
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    @JsonProperty("isActive")
    public Boolean getActive() {
        return isActive;
    }

    @Override
    public void setActive(Boolean active) {
        isActive = active;
    }

    public Set<User> getUserSet() {
        return userSet;
    }

    public void setUserSet(Set<User> userSet) {
        this.userSet = userSet;
    }

    // relational getter and setter
    public List<Integer> getUserIds() {
        return userSet.stream()
                .map(User::getId)
                .collect(Collectors.toList());
    }

    // to string
    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", progress=" + progress +
                ", isActive=" + isActive +
//                ", userSet=" + userSet +
                '}';
    }
}
