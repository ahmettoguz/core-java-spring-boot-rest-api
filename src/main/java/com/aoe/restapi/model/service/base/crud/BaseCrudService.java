package com.aoe.restapi.model.service.base.crud;

import com.aoe.restapi.model.service.base.BaseService;
import com.aoe.restapi.utility.Status.OperationStatus;

public interface BaseCrudService<T> extends BaseService<T> {
    // helper methods
    OperationStatus mergeInstance(T originalInstance, T newInstance);

    // create
    OperationStatus create(T objectToInsert);

    // read
    OperationStatus readById(Integer id);

    OperationStatus readAll();

    OperationStatus readInstancesPagedSorted(int pageNumber, int pageSize, boolean isDescending);

    OperationStatus count();

    // update
    OperationStatus updateMergedInstance(T instance);

    OperationStatus update(T instance);

    // delete
    OperationStatus deleteById(int id);

    OperationStatus changeActivationById(int id, boolean state);
}
