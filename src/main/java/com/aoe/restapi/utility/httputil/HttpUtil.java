package com.aoe.restapi.utility.httputil;

import com.aoe.restapi.exception.exception.AuthorizationHeaderException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class HttpUtil {

    private static String removePrecedingBearer(String token) {
        return token.substring(7);
    }

    public static String getTokenFromHeader() {
        // Get the current request
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        // Extract the Authorization header
        String header = request.getHeader("Authorization");

        // Check if the header is not null and starts with "Bearer"
        if (header == null || !header.startsWith("Bearer "))
            throw new AuthorizationHeaderException();

        return removePrecedingBearer(header);
    }
}
