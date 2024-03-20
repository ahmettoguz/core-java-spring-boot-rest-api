package com.aoe.restapi.model.service.user;

import com.aoe.restapi.model.dao.UserRepository;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.base.crud.BaseCrudServiceImpl;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import com.aoe.restapi.utility.auth.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

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

    // custom create method for encrypt password
    @Override
    public OperationStatus create(T objectToInsert) {
        // encrypt password
        objectToInsert.setPassword(AuthUtil.getEncryptedText(objectToInsert.getPassword()));

        try {
            return new OperationStatusSuccess<T>(repository.save(objectToInsert));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // update user password encrypted
    @Override
    public OperationStatus updatePassword(T objectToUpdate, String newPassword) {
        // encrypt password
        objectToUpdate.setPassword(AuthUtil.getEncryptedText(newPassword));

        try {
            return new OperationStatusSuccess<T>(repository.save(objectToUpdate));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }


    // findByEmail
    @Override
    public OperationStatus findByEmail(String email) {
        try {
            return new OperationStatusSuccess<User>(((UserRepository) repository).findByEmail(email));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // search users by their first names (exact match)
    @Override
    public OperationStatus searchUsersByExactFirstName(String exactFirstName, int pageNumber, int pageSize, boolean isDescending) {
        try {
            Sort sort = Sort.by(isDescending ? Sort.Direction.DESC : Sort.Direction.ASC, "id");
            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
            List<T> instances = ((Page<T>) ((UserRepository) repository).findByFirstName(exactFirstName, pageable)).getContent();
            
            return new OperationStatusSuccess<List<T>>(instances);
        } catch (Exception e) {
            System.out.println(e.toString());
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // search users by their first names (partial)
    @Override
    public OperationStatus searchUsersByPartialFirstName(String partialFirstName, int pageNumber, int pageSize, boolean isDescending) {
        try {
            Sort sort = Sort.by(isDescending ? Sort.Direction.DESC : Sort.Direction.ASC, "id");
            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
            List<T> instances = ((Page<T>) ((UserRepository) repository).findByFirstNameContaining(partialFirstName, pageable)).getContent();

            return new OperationStatusSuccess<List<T>>(instances);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }


}