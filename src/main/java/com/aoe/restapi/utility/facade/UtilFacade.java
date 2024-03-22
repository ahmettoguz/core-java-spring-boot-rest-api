package com.aoe.restapi.utility.facade;

import com.aoe.restapi.exception.exception.ArgException;
import com.aoe.restapi.exception.exception.AuthenticationException;
import com.aoe.restapi.exception.exception.JwtNotValidException;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.entity.UserRole;
import com.aoe.restapi.utility.auth.JwtUtil;
import com.aoe.restapi.utility.http.HttpUtil;
import org.aspectj.lang.JoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UtilFacade {

    private JwtUtil jwtUtil;

    @Autowired
    public UtilFacade(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public int getIdFromJwtHeader() {
        // get token from header
        String jwtToken = HttpUtil.getTokenFromHeader();

        // get id from jwt
        return Integer.parseInt(jwtUtil.getIdFromToken(jwtToken));
    }

    public void commonJwtAuthentication() {
        // get token from header
        String jwtToken = HttpUtil.getTokenFromHeader();

        // validate jwt token
        if (!jwtUtil.validateToken(jwtToken))
            throw new JwtNotValidException();
    }


    public Object[] getArguments(JoinPoint joinPoint) {
        // get the arguments
        Object[] args = joinPoint.getArgs();

        // check arguments
        if (args.length == 0)
            throw new ArgException();

        return args;
    }

    public static void checkAuthentication(User user, String[] roles) {
        if (!user.getRoleSet().stream().anyMatch(role -> role.getName().equals("project manager")))
            throw new AuthenticationException();

        Set<String> userRoles = user.getRoleSet().stream()
                .map(UserRole::getName)
                .collect(Collectors.toSet());

        boolean hasAnyRole = Arrays.stream(roles)
                .anyMatch(userRoles::contains);

        if (!hasAnyRole) {
            throw new AuthenticationException();
        }
    }
}
