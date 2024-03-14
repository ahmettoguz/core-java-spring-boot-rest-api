package com.aoe.restapi.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class UserRole {
    // fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    // relational field
    @JsonIgnore
    @ManyToMany(mappedBy = "roleSet", cascade = {CascadeType.ALL})
    private Set<User> userSet;

    public UserRole() {
    }

    public UserRole(Integer id, String name, Set<User> userSet) {
        this.id = id;
        this.name = name;
        this.userSet = userSet;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "UserRole{" +
                "id=" + id +
                ", name='" + name + '\'' +
//                ", userSet=" + userSet +
                '}';
    }
}
