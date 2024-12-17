package com.aoe.restapi.model.service.user;

import com.aoe.restapi.model.service.base.crud.BaseCrudService;
import com.aoe.restapi.utility.status.OperationStatus;

public interface UserService<T> extends BaseCrudService<T> {
    @Override
    public OperationStatus create(T objectToInsert);

    public OperationStatus updatePassword(T objectToUpdate, String newPassword);

    public OperationStatus findByEmail(String email);

    public OperationStatus searchUsersByExactFirstName(String exactFirstName, int pageNumber, int pageSize, boolean isDescending);

    public OperationStatus searchUsersByPartialFirstName(String partialFirstName, int pageNumber, int pageSize, boolean isDescending);
}
