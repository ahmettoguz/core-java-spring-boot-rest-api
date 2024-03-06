package com.aoe.restapi.model.service.auth;

import com.aoe.restapi.model.dao.UserRepository;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl<T extends User> implements AuthService {
    private final JpaRepository<T, Integer> repository;

    @Autowired
    public AuthServiceImpl(JpaRepository<T, Integer> repository) {
        this.repository = repository;
    }

    @Override
    public OperationStatus findUserByEmail(String email) {
        User user = ((UserRepository) repository).findByEmail(email);
        if (user != null)
            return new OperationStatusSuccess<User>(user);

        return new OperationStatusError(HttpStatus.BAD_REQUEST);
    }
}
