package com.aoe.restapi.model.service.base.crud;

import com.aoe.restapi.model.service.Activatable;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public abstract class BaseCrudServiceImpl<T extends Activatable> implements BaseCrudService<T> {
    private final JpaRepository<T, Integer> repository;

    public BaseCrudServiceImpl(JpaRepository<T, Integer> repository) {
        this.repository = repository;
    }

    // create
    @Override
    public OperationStatus create(T objectToInsert) {
        try {
            return new OperationStatusSuccess<T>(repository.save(objectToInsert));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // read
    @Override
    public OperationStatus readById(Integer id) {
        try {
            Optional<T> readOptional = (Optional<T>) repository.findById(id);

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
            return new OperationStatusSuccess<List<T>>((List<T>) repository.findAll());
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
            Page<T> usersPage = (Page<T>) repository.findAll(pageable);
            List<T> readInstances = (List<T>) usersPage.getContent();

            return new OperationStatusSuccess<List<T>>(readInstances);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    @Override
    public OperationStatus count() {
        Long count = repository.count();
        return new OperationStatusSuccess<Long>(count);
    }

    // update
    @Override
    public OperationStatus update(T instanceToUpdate) {
        try {
            return new OperationStatusSuccess<T>(repository.save(instanceToUpdate));
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

    // delete
    @Override
    public OperationStatus deleteById(int id) {
        try {
            Optional<T> readOperation = (Optional<T>) repository.findById(id);

            if (readOperation.isPresent()) {
                T readInstance = readOperation.get();

                repository.deleteById(id);
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
            Optional<T> readOperation = (Optional<T>) repository.findById(id);

            if (readOperation.isPresent()) {
                T instance = readOperation.get();

                instance.setActive(state);
                repository.save(instance);
                return new OperationStatusSuccess<T>(instance);
            } else
                return new OperationStatusError(HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }

}
