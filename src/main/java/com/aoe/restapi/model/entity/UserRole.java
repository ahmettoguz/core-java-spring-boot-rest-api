package com.aoe.restapi.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Entity
@Table(name = "roles")
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
}
