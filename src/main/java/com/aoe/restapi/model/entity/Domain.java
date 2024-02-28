package com.aoe.restapi.model.entity;

import com.aoe.restapi.controller.base.Identifiable;
import com.aoe.restapi.model.service.Activatable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;


@Entity
@Table(name = "domains")
public class Domain implements Activatable, Identifiable {
    // fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private Boolean isActive;

    // relational field
    @JsonIgnore
    @OneToOne(mappedBy = "domain", cascade = CascadeType.ALL)
    private User user;

    // constructor
    public Domain() {
    }

    public Domain(Integer id, String name, Boolean isActive, User user) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.user = user;
    }

    // getter and setter
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        if (user == null)
            return null;
        return user.getId();
    }

    // toString
    @Override
    public String toString() {
        return "Domain{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isActive=" + isActive +
                ", user=" + user +
                '}';
    }
}

