package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {
    // fields
    @Column(name = "title")
    private String title;

    @Column(name = "progress")
    private Integer progress;

    // relational field
    @JsonIgnore
    @ManyToMany(mappedBy = "projectSet", cascade = {CascadeType.ALL})
    private Set<User> userSet;

    // constructor
    public Project() {
    }

    public Project(String title, Integer progress, Set<User> userSet) {
        this.title = title;
        this.progress = progress;
        this.userSet = userSet;
    }

    // getter setter
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

    public Set<User> getUserSet() {
        return userSet;
    }

    public void setUserSet(Set<User> userSet) {
        this.userSet = userSet;
    }

    // relational getter
    public List<Integer> getUserIds() {
        if (userSet == null)
            return null;
        else {
            return userSet.stream()
                    .map(User::getId)
                    .collect(Collectors.toList());
        }
    }

    // to string
    @Override
    public String toString() {
        return super.toString() + "Project{" +
                "title='" + title + '\'' +
                ", progress=" + progress +
//                ", userSet=" + userSet +
                '}';
    }
}
