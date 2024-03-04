package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "issues")
public class Issue extends BaseEntity {
    // fields
    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    // relational field
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    // constructor
    public Issue() {
    }

    public Issue(String title, String description, User user) {
        this.title = title;
        this.description = description;
        this.user = user;
    }

    // getter setter
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // relational getter
    public Integer getUserId() {
        if (user != null)
            return user.getId();
        return null;
    }

    // to string

    @Override
    public String toString() {
        return super.toString() + "Issue{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
//                ", user=" + user +
                '}';
    }
}
