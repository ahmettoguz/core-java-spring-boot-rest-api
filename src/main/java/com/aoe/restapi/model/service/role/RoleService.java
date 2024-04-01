package com.aoe.restapi.model.service.role;

import com.aoe.restapi.utility.status.OperationStatus;

public interface RoleService<T> {

    // read
    OperationStatus readById(Integer id);

}
