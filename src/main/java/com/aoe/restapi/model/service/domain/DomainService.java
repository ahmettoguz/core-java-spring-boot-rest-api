package com.aoe.restapi.model.service.domain;

import com.aoe.restapi.utility.Status.OperationStatus;

public interface DomainService<T> {
    // helper methods
    OperationStatus mergeInstance(T originalInstance, T newEntity);

    // create
    OperationStatus create(T objectToInsert);

    // read
    OperationStatus readById(Integer id);

    OperationStatus readAll();

    OperationStatus readInstancesPagedSorted(int pageNumber, int pageSize, boolean isDescending);

    // update
    OperationStatus update(T instance);

    // delete
    OperationStatus deleteById(int id);

    OperationStatus changeActivationById(int id, boolean state);
}
