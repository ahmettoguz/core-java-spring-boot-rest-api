package com.aoe.restapi.model.service.domain;

import com.aoe.restapi.model.dao.DomainRepository;
import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomainServiceImpl<T extends Domain> implements DomainService<T> {
    private final DomainRepository domainRepository;

    @Autowired
    public DomainServiceImpl(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    // helper methods
    @Override
    public OperationStatus mergeInstance(T originalInstance, T newInstance) {
        // check new entity if it is null
        if (newInstance == null)
            return new OperationStatusError(HttpStatus.BAD_REQUEST);

        try {
            // get fields
            String name = newInstance.getName();
            Boolean isActive = newInstance.getActive();

            // update fields
            if (name != null)
                originalInstance.setName(name);
            if (isActive != null)
                originalInstance.setActive(isActive);

            // return original instance to update
            return new OperationStatusSuccess<T>(originalInstance);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // create
    @Override
    public OperationStatus create(T objectToInsert) {
        try {
            return new OperationStatusSuccess<T>(domainRepository.save(objectToInsert));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // read
    @Override
    public OperationStatus readById(Integer id) {
        try {
            Optional<T> readOptional = (Optional<T>) domainRepository.findById(id);

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

    @Override
    public OperationStatus readAll() {
        try {
            return new OperationStatusSuccess<List<T>>((List<T>) domainRepository.findAll());
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    @Override
    public OperationStatus readInstancesPagedSorted(int pageNumber, int pageSize, boolean isDescending) {
        try {
            Sort sort;
            if (isDescending) sort = Sort.by("id").descending();
            else sort = Sort.by("id").ascending();

            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
            Page<T> usersPage = (Page<T>) domainRepository.findAll(pageable);
            List<T> readInstances = (List<T>) usersPage.getContent();

            return new OperationStatusSuccess<List<T>>(readInstances);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // update
    @Override
    public OperationStatus update(T instanceToUpdate) {
        try {
            return new OperationStatusSuccess<T>(domainRepository.save(instanceToUpdate));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // delete
    @Override
    public OperationStatus deleteById(int id) {
        try {
            Optional<T> readOperation = (Optional<T>) domainRepository.findById(id);

            if (readOperation.isPresent()) {
                T readInstance = readOperation.get();

                domainRepository.deleteById(id);
                return new OperationStatusSuccess<T>(readInstance);
            } else
                return new OperationStatusError(HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    @Override
    public OperationStatus changeActivationById(int id, boolean state) {
        try {
            Optional<T> readOperation = (Optional<T>) domainRepository.findById(id);

            if (readOperation.isPresent()) {
                T instance = readOperation.get();

                instance.setActive(state);
                domainRepository.save(instance);
                return new OperationStatusSuccess<T>(instance);
            } else
                return new OperationStatusError(HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }
}
