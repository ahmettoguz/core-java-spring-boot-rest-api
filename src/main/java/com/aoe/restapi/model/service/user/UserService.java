package com.aoe.restapi.model.service.user;

import com.aoe.restapi.model.service.base.crud.BaseCrudService;
import com.aoe.restapi.utility.Status.OperationStatus;

public interface UserService<T> extends BaseCrudService<T> {
    @Override
    public OperationStatus create(T objectToInsert);

    public OperationStatus updatePassword(T objectToUpdate, String newPassword);


    public OperationStatus searchUsersByFirstName(String searchText);
}
