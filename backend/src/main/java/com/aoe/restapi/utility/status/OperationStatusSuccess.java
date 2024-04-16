package com.aoe.restapi.utility.status;

import com.aoe.restapi.utility.log.LogUtility;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class OperationStatusSuccess<T> extends OperationStatus {
    private T data;

    private String message;

    private String stackTrace;

    private HttpHeaders headers;

    // constructor
    public OperationStatusSuccess() {
        super(HttpStatus.OK, true);
        stackTrace = LogUtility.getStackTrace();
    }

    public OperationStatusSuccess(T data) {
        super(HttpStatus.OK, true);
        this.data = data;
        stackTrace = LogUtility.getStackTrace();
    }

    public OperationStatusSuccess(T data, HashMap<String, String> headerMap) {
        super(HttpStatus.OK, true);
        this.data = data;
        stackTrace = LogUtility.getStackTrace();

        // add headers
        headers = new HttpHeaders();
        for (Map.Entry<String, String> entry : headerMap.entrySet()) {
            headers.add(entry.getKey(), entry.getValue());
        }
    }

    // methods
    @Override
    public ResponseEntity<HashMap<String, Object>> getResponseEntity() {
        HashMap<String, Object> responseData = new HashMap<>();
        responseData.put("status", this.getStatus());
        responseData.put("state", this.getState());
        responseData.put("data", data);

        // put headers if exist
        HttpHeaders responseHeaders = null;
        if (headers != null && !headers.isEmpty()) {
            responseHeaders = headers;
        }

        return new ResponseEntity<HashMap<String, Object>>(responseData, responseHeaders, this.getStatus());
    }

    // getter setter
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // to string
    @Override
    public String toString() {
        return super.toString() + " -> " + "OperationStatusSuccess{" +
                "data=" + data +
                ", message='" + message + '\'' +
                '}';
    }
}
