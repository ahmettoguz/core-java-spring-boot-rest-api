package com.aoe.restapi.model.service.project;

import com.aoe.restapi.model.entity.Project;
import com.aoe.restapi.model.service.base.crud.BaseCrudServiceImpl;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl<T extends Project> extends BaseCrudServiceImpl<T> implements ProjectService<T> {
    private final JpaRepository<T, Integer> repository;

    @Autowired
    public ProjectServiceImpl(JpaRepository<T, Integer> repository) {
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
            String newTitle = newInstance.getTitle();
            Integer newProgress = newInstance.getProgress();

            // update original instance with new fields
            if (newTitle != null)
                originalInstance.setTitle(newTitle);
            if (newProgress != null)
                originalInstance.setProgress(newProgress);

            // return original instance to update
            return new OperationStatusSuccess<T>(originalInstance);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }
}
