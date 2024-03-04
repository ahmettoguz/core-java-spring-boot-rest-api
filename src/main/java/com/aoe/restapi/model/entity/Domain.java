package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


@Entity
@Table(name = "domains")
public class Domain extends BaseEntity {
    // fields
    @Column(name = "name")
    private String name;

    // relational field
    @JsonIgnore
    @OneToOne(mappedBy = "domain", cascade = CascadeType.ALL)
    private User user;

    // constructor
    public Domain() {
    }

    public Domain(String name, User user) {
        this.name = name;
        this.user = user;
    }

    // getter and setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // relational getter
    public Integer getUserId() {
        if (user == null)
            return null;
        return user.getId();
    }

    // toString
    @Override
    public String toString() {
        return super.toString() + "Domain{" +
                "name='" + name + '\'' +
//                ", user=" + user +
                '}';
    }
}

