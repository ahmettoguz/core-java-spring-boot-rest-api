package com.aoe.restapi.model.service.role;

import com.aoe.restapi.model.entity.Role;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl<T extends Role> implements RoleService<T> {

    private final JpaRepository<T, Integer> repository;

    @Autowired
    public RoleServiceImpl(JpaRepository<T, Integer> repository) {
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
