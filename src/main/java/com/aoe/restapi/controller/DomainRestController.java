package com.aoe.restapi.controller;

import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.model.service.domain.DomainService;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/domains")
public class DomainRestController {
    private final DomainService domainService;

    @Autowired
    public DomainRestController(DomainService domainService) {
        this.domainService = domainService;
    }

    // create
    @PostMapping
    public <T extends Domain> ResponseEntity createInstance(@RequestBody(required = false) T newInstance) {
        // perform operation and return
        OperationStatus operationStatus = domainService.create(newInstance);
        return operationStatus.getResponseEntity();
    }

    // read
    @GetMapping
    public ResponseEntity readInstances() {
        // perform operation and return
        OperationStatus operationStatus = domainService.readAll();
        return operationStatus.getResponseEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HashMap<String, Object>> readInstanceById(@PathVariable("id") int id) {
        // perform operation and return
        OperationStatus operationStatus = domainService.readById(id);
        return operationStatus.getResponseEntity();
    }

    @GetMapping("/paged")
    public ResponseEntity readAllCompaniesPagedSorted(
            @RequestBody(required = false) HashMap<String, String> requestBody) {
        // re-initialize request body to be able to perform getOrDefault
        if (requestBody == null) {
            requestBody = new HashMap<>();
        }

        // get input from body
        int page = Integer.parseInt(requestBody.getOrDefault("page", "0"));
        int size = Integer.parseInt(requestBody.getOrDefault("size", "5"));
        boolean isDescending = Boolean.parseBoolean(requestBody.getOrDefault("isDescending", "false"));

        // perform operation and return
        OperationStatus operationStatus = domainService.readInstancesPagedSorted(page, size, isDescending);
        return operationStatus.getResponseEntity();
    }

    // update
    @PutMapping("/{id}")
    public <T extends Domain> ResponseEntity updateInstance(@PathVariable int id, @RequestBody(required = false) T newInstance) {
        // read original instance
        OperationStatus operationStatus = domainService.readById(id);

        // check read operation
        if (operationStatus instanceof OperationStatusError)
            return operationStatus.getResponseEntity();
        // get original instance
        T originalInstance = ((OperationStatusSuccess<T>) operationStatus).getData();

        // merge and create object with new attributes
        operationStatus = domainService.mergeInstance(originalInstance, newInstance);

        // check operation
        if (operationStatus instanceof OperationStatusError)
            return operationStatus.getResponseEntity();

        // get instance
        T updatedInstance = ((OperationStatusSuccess<T>) operationStatus).getData();

        // perform operation and return
        operationStatus = domainService.update(updatedInstance);
        return operationStatus.getResponseEntity();
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity deleteInstance(@PathVariable int id) {
        // perform operation and return
        OperationStatus operationStatus = domainService.deleteById(id);
        return operationStatus.getResponseEntity();
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity deactivateInstanceById(@PathVariable int id) {
        // perform operation and return
        OperationStatus operationStatus = domainService.changeActivationById(id, false);
        return operationStatus.getResponseEntity();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity activateInstanceById(@PathVariable int id) {
        // perform operation and return
        OperationStatus operationStatus = domainService.changeActivationById(id, true);
        return operationStatus.getResponseEntity();
    }
}
