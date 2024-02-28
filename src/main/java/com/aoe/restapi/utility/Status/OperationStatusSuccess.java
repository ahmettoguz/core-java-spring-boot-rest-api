package com.aoe.restapi.utility.Status;

import com.aoe.restapi.utility.LogUtility.LogUtility;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class OperationStatusSuccess<T> extends OperationStatus {
    private T data;

    private String message;

    // constructor
    public OperationStatusSuccess() {
        super(HttpStatus.OK, true);
        message = LogUtility.getMessage();
    }

    public OperationStatusSuccess(T data) {
        super(HttpStatus.OK, true);
        this.data = data;
        message = LogUtility.getMessage();
    }

    // methods
    @Override
    public ResponseEntity<HashMap<String, Object>> getResponseEntity() {
        HashMap<String, Object> responseData = new HashMap<>();
        responseData.put("status", this.getStatus());
        responseData.put("state", this.getState());
        responseData.put("data", data);

        return new ResponseEntity<HashMap<String, Object>>(responseData, this.getStatus());
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
