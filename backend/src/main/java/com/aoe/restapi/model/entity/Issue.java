package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
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

    // relational getter
    public Integer getUserId() {
        if (user != null)
            return user.getId();
        return null;
    }
}
