package com.aoe.restapi.model.service.Issue;

import com.aoe.restapi.model.entity.Issue;
import com.aoe.restapi.model.service.base.crud.BaseCrudServiceImpl;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
public class IssueServiceImpl<T extends Issue> extends BaseCrudServiceImpl<T> implements IssueService<T> {

    private final JpaRepository<T, Integer> repository;

    @Autowired
    public IssueServiceImpl(JpaRepository<T, Integer> repository) {
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
            String newDescription = newInstance.getDescription();

            // update original instance with new fields
            if (newTitle != null)
                originalInstance.setTitle(newTitle);
            if (newDescription != null)
                originalInstance.setDescription(newDescription);

            // return original instance to update
            return new OperationStatusSuccess<T>(originalInstance);
        } catch (Exception e) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST, e);
        }
    }
}
