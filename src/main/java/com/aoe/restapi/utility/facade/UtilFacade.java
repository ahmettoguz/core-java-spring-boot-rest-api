package com.aoe.restapi.utility.facade;

import com.aoe.restapi.exception.exception.JwtNotValidException;
import com.aoe.restapi.utility.auth.JwtUtil;
import com.aoe.restapi.utility.http.HttpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilFacade {

    private JwtUtil jwtUtil;

    @Autowired
    public UtilFacade(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public int performJwtOperations() {
        // get token from header
        String jwtToken = HttpUtil.getTokenFromHeader();

        // validate jwt token
        if (!jwtUtil.validateToken(jwtToken))
            throw new JwtNotValidException();

        // get id from jwt
        int userId = Integer.parseInt(jwtUtil.getIdFromToken(jwtToken));
        return userId;
    }
}
