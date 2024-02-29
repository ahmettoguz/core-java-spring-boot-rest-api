package com.aoe.restapi.model.entity;

import com.aoe.restapi.controller.base.Identifiable;
import com.aoe.restapi.model.service.Activatable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "issues")
public class Issue  implements Activatable, Identifiable {
    // fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "is_active")
    private Boolean isActive;

    // relational field
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    // constructor
    public Issue() {
    }

    public Issue(Integer id, String title, String description, Boolean isActive, User user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isActive = isActive;
        this.user = user;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("isActive")
    public Boolean getActive() {
        return isActive;
    }

    @Override
    public void setActive(Boolean active) {
        isActive = active;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // relational getter and setter

    public Integer getUserId() {
        if (user != null)
            return user.getId();
        return null;
    }

    // to string
    @Override
    public String toString() {
        return "Issue{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", isActive=" + isActive +
                ", user=" + user +
                '}';
    }
}
