package com.aoe.restapi.utility.http;

import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public class ResponseUtil {
    public static ResponseEntity<HashMap<String, Object>> getResponseWithoutData(OperationStatus operationStatus) {
        ResponseEntity<HashMap<String, Object>> responseEntity = operationStatus.getResponseEntity();

        // change data field if operation is success
        if (operationStatus instanceof OperationStatusSuccess<?>)
            if (responseEntity.hasBody()) {
                responseEntity.getBody().remove("data");
            }

        return responseEntity;
    }
}
