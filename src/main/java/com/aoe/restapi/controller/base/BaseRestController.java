package com.aoe.restapi.controller.base;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface BaseRestController<T> {

    // create
    public ResponseEntity<HashMap<String, Object>> createInstance(T newInstance);

    // read
    public ResponseEntity<HashMap<String, Object>> readInstances();

    public ResponseEntity<HashMap<String, Object>> readInstanceById(int id);

    public ResponseEntity<HashMap<String, Object>> readAllInstancesPagedSorted(HashMap<String, String> requestBody);

    public ResponseEntity<HashMap<String, Object>> count();

    // update
    public ResponseEntity<HashMap<String, Object>> mergeUpdatedInstance(int id, T newInstance);

    public ResponseEntity<HashMap<String, Object>> deactivateInstanceById(int id);

    public ResponseEntity<HashMap<String, Object>> activateInstanceById(int id);

    // delete
    public ResponseEntity<HashMap<String, Object>> deleteInstance(int id);
}
