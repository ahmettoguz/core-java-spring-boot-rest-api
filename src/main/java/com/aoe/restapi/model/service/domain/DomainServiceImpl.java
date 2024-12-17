package com.aoe.restapi.model.service.domain;

import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.model.service.base.crud.BaseCrudServiceImpl;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
public class DomainServiceImpl<T extends Domain> extends BaseCrudServiceImpl<T> implements DomainService<T> {

    private final JpaRepository<T, Integer> repository;

    @Autowired
    public DomainServiceImpl(JpaRepository<T, Integer> repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public OperationStatus mergeInstance(T originalInstance, T newInstance) {
        // check new entity if it is null
        if (newInstance == null)
            return new OperationStatusError(HttpStatus.BAD_REQUEST);

        try {
            // get new fields
            String newName = newInstance.getName();

            // update original instance with new fields
            if (newName != null)
                originalInstance.setName(newName);

            // return original instance to update
            return new OperationStatusSuccess<T>(originalInstance);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

}
