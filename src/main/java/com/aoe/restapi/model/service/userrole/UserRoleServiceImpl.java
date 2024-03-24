package com.aoe.restapi.model.service.userrole;

import com.aoe.restapi.model.entity.UserRole;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserRoleServiceImpl<T extends UserRole> implements UserRoleService<T> {
    private final JpaRepository<T, Integer> repository;

    @Autowired
    public UserRoleServiceImpl(JpaRepository<T, Integer> repository) {
        this.repository = repository;
    }

    // read
    @Override
    public OperationStatus readById(Integer id) {
        try {
            Optional<T> readOptional = (Optional<T>) repository.findById(id);

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

}