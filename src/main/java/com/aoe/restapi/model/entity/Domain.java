package com.aoe.restapi.model.entity;

import com.aoe.restapi.model.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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

    // relational getter
    public Integer getUserId() {
        if (user == null)
            return null;
        return user.getId();
    }
}

