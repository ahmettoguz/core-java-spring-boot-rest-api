package com.aoe.restapi.model.service.userrole;

import com.aoe.restapi.model.service.base.crud.BaseCrudService;
import com.aoe.restapi.utility.Status.OperationStatus;

public interface UserRoleService<T> {

    // read
    OperationStatus readById(Integer id);
}
