package com.aoe.restapi.model.service.Issue;

import com.aoe.restapi.model.dao.IssueRepository;
import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.model.entity.Issue;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl<T extends Issue> implements IssueService<T> {
    private final IssueRepository issueRepository;

    @Autowired
    public IssueServiceImpl(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    // helper methods
    @Override
    public OperationStatus mergeInstance(T originalInstance, T newInstance) {
        // check new entity if it is null
        if (newInstance == null)
            return new OperationStatusError(HttpStatus.BAD_REQUEST);

        try {
            // get fields
            String title = newInstance.getTitle();
            String description = newInstance.getDescription();
            String iat = newInstance.getIat();
            Boolean isActive = newInstance.getActive();

            // update fields
            if (title != null)
                originalInstance.setTitle(title);
            if (description != null)
                originalInstance.setDescription(description);
            if (iat != null)
                originalInstance.setIat(iat);
            if (isActive != null)
                originalInstance.setActive(isActive);

            // relational field
            User user = newInstance.getUser();
            if (user != null) {
                User originalUser = originalInstance.getUser();

                // if there is original instance, update
                if (originalUser != null) {
                    // get fields
                    String subFirstName = user.getFirstName();
                    String subEmail = user.getEmail();
                    String subPassword = user.getPassword();
                    Boolean subIsActive = user.getActive();

                    // update fields
                    if (subFirstName != null)
                        originalUser.setFirstName(subFirstName);
                    if (subEmail != null)
                        originalUser.setEmail(subEmail);
                    if (subIsActive != null)
                        originalUser.setActive(subIsActive);
                    if (subPassword != null)
                        originalUser.setPassword(subPassword);

                    originalInstance.setUser(originalUser);
                } else {
                    // set directly if there is no original domain
                    originalInstance.setUser(user);
                }
            }

            // return original instance to update
            return new OperationStatusSuccess<T>(originalInstance);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // create
    @Override
    public OperationStatus create(T objectToInsert) {
        try {
            return new OperationStatusSuccess<T>(issueRepository.save(objectToInsert));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // read
    @Override
    public OperationStatus readById(Integer id) {
        try {
            Optional<T> readOptional = (Optional<T>) issueRepository.findById(id);

            if (readOptional.isPresent()) {
                T instance = readOptional.get();
                return new OperationStatusSuccess<T>(instance);
            } else {
                return new OperationStatusError(HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    @Override
    public OperationStatus readAll() {
        try {
            return new OperationStatusSuccess<List<T>>((List<T>) issueRepository.findAll());
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    @Override
    public OperationStatus readInstancesPagedSorted(int pageNumber, int pageSize, boolean isDescending) {
        try {
            Sort sort;
            if (isDescending) sort = Sort.by("id").descending();
            else sort = Sort.by("id").ascending();

            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
            Page<T> usersPage = (Page<T>) issueRepository.findAll(pageable);
            List<T> readInstances = (List<T>) usersPage.getContent();

            return new OperationStatusSuccess<List<T>>(readInstances);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // update
    @Override
    public OperationStatus update(T instanceToUpdate) {
        try {
            return new OperationStatusSuccess<T>(issueRepository.save(instanceToUpdate));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // delete
    @Override
    public OperationStatus deleteById(int id) {
        try {
            Optional<T> readOperation = (Optional<T>) issueRepository.findById(id);

            if (readOperation.isPresent()) {
                T readInstance = readOperation.get();

                issueRepository.deleteById(id);
                return new OperationStatusSuccess<T>(readInstance);
            } else
                return new OperationStatusError(HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    @Override
    public OperationStatus changeActivationById(int id, boolean state) {
        try {
            Optional<T> readOperation = (Optional<T>) issueRepository.findById(id);

            if (readOperation.isPresent()) {
                T instance = readOperation.get();

                instance.setActive(state);
                issueRepository.save(instance);
                return new OperationStatusSuccess<T>(instance);
            } else
                return new OperationStatusError(HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }
}
