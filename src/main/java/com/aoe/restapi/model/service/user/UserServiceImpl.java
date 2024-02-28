package com.aoe.restapi.model.service.user;

import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.model.entity.Issue;
import com.aoe.restapi.model.entity.Project;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.base.crud.BaseCrudServiceImpl;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl<T extends User> extends BaseCrudServiceImpl<T> implements UserService<T> {
    private final JpaRepository<T, Integer> repository;

    @Autowired
    public UserServiceImpl(JpaRepository<T, Integer> repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public OperationStatus mergeInstance(T originalInstance, T newInstance) {
        // check new entity if it is null
        if (newInstance == null)
            return new OperationStatusError(HttpStatus.BAD_REQUEST);

        try {
            // get new fields
            String newFirstName = newInstance.getFirstName();
            String newEmail = newInstance.getEmail();
            String newPassword = newInstance.getPassword();

            // update original instance with new fields
            if (newFirstName != null)
                originalInstance.setFirstName(newFirstName);
            if (newEmail != null)
                originalInstance.setEmail(newEmail);
            if (newPassword != null)
                originalInstance.setPassword(newPassword);

            // return original instance to update
            return new OperationStatusSuccess<T>(originalInstance);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }
}