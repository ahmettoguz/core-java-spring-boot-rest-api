package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
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
