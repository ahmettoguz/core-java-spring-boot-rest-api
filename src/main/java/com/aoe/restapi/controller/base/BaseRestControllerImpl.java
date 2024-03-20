package com.aoe.restapi.controller.base;

import com.aoe.restapi.model.service.base.BaseService;
import com.aoe.restapi.model.service.base.crud.BaseCrudService;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

public abstract class BaseRestControllerImpl<T extends Identifiable> implements BaseRestController<T> {

    private final BaseService<T> service;

    @Autowired
    public BaseRestControllerImpl(BaseService<T> service) {
        this.service = service;
    }

    // create
    @PostMapping
    public ResponseEntity<HashMap<String, Object>> createInstance(@RequestBody(required = false) T newInstance) {
        // remove id because it is auto increment, if not remove id, it will update if its exist already
        newInstance.setId(null);

        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).create(newInstance);

        return operationStatus.getResponseEntity();
    }

    // read
    @GetMapping
    public ResponseEntity<HashMap<String, Object>> readInstances() {
        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).readAll();
        return operationStatus.getResponseEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HashMap<String, Object>> readInstanceById(@PathVariable("id") int id) {
        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).readById(id);
        return operationStatus.getResponseEntity();
    }

    @GetMapping("/paged")
    public ResponseEntity<HashMap<String, Object>> readAllInstancesPagedSorted(
            @RequestBody(required = false) HashMap<String, String> requestBody) {
        // Initialize a new HashMap if the requestBody is null
        requestBody = requestBody == null ? new HashMap<>() : requestBody;

        // get page inputs from body
        int pageNumber = Integer.parseInt(requestBody.getOrDefault("pageNumber", "0"));
        int pageSize = Integer.parseInt(requestBody.getOrDefault("pageSize", "5"));
        boolean isDescending = Boolean.parseBoolean(requestBody.getOrDefault("isDescending", "false"));

        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).readInstancesPagedSorted(pageNumber, pageSize, isDescending);
        return operationStatus.getResponseEntity();
    }

    @GetMapping("/count")
    public ResponseEntity<HashMap<String, Object>> count() {
        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).count();
        return operationStatus.getResponseEntity();
    }

    // update
    @PutMapping("/{id}")
    public ResponseEntity<HashMap<String, Object>> mergeUpdatedInstance(@PathVariable int id, @RequestBody(required = false) T newInstance) {
        // read original instance
        OperationStatus operationStatus = ((BaseCrudService<T>) service).readById(id);

        // check read operation
        if (operationStatus instanceof OperationStatusError)
            return operationStatus.getResponseEntity();

        // get original instance
        T originalInstance = ((OperationStatusSuccess<T>) operationStatus).getData();

        // merge and create object with new attributes
        operationStatus = ((BaseCrudService<T>) service).mergeInstance(originalInstance, newInstance);

        // check operation
        if (operationStatus instanceof OperationStatusError)
            return operationStatus.getResponseEntity();

        // get instance
        T updatedInstance = ((OperationStatusSuccess<T>) operationStatus).getData();

        // perform operation and return
        operationStatus = ((BaseCrudService<T>) service).update(updatedInstance);
        return operationStatus.getResponseEntity();
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<HashMap<String, Object>> deleteInstance(@PathVariable int id) {
        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).deleteById(id);
        return operationStatus.getResponseEntity();
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<HashMap<String, Object>> deactivateInstanceById(@PathVariable int id) {
        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).changeActivationById(id, false);
        return operationStatus.getResponseEntity();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<HashMap<String, Object>> activateInstanceById(@PathVariable int id) {
        // perform operation and return
        OperationStatus operationStatus = ((BaseCrudService<T>) service).changeActivationById(id, true);
        return operationStatus.getResponseEntity();
    }
}
