package com.aoe.restapi.model.service.auth;

import com.aoe.restapi.utility.Status.OperationStatus;

public interface AuthService {
    OperationStatus findUserByEmail(String email);
}
