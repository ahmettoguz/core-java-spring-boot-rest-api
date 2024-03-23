package com.aoe.restapi.facade;

import com.aoe.restapi.exception.exception.ArgException;
import com.aoe.restapi.exception.exception.AuthorizationException;
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
public class AspectFacade {

    private final JwtUtil jwtUtil;

    @Autowired
    public AspectFacade(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public Object[] getArguments(JoinPoint joinPoint) {
        // get the arguments
        Object[] args = joinPoint.getArgs();

        // check arguments
        if (args.length == 0)
            throw new ArgException();

        return args;
    }

    public void commonJwtAuthentication() {
        // get token from header
        String jwtToken = HttpUtil.getTokenFromHeader();

        // validate jwt token
        if (!jwtUtil.validateToken(jwtToken))
            throw new JwtNotValidException();
    }

    public int getIdFromJwtHeader() {
        // get token from header
        String jwtToken = HttpUtil.getTokenFromHeader();

        // get id from jwt
        return Integer.parseInt(jwtUtil.getIdFromToken(jwtToken));
    }

    public void restrictAccess(User user, JoinPoint joinPoint) {
        this.authorizeWithRole(user, new String[]{"admin"});
    }

    public void authorizeWithId(User user, JoinPoint joinPoint) {
        // get arguments
        Object[] args = this.getArguments(joinPoint);

        // get user id
        int userId = user.getId();

        // get target id from argument
        int targetId = Integer.parseInt(args[0].toString());

        if (userId != targetId)
            throw new AuthorizationException();
    }

    public void authorizeWithRole(User user, String[] allowedRoles) {
        Set<String> userRoles = user.getRoleSet().stream()
                .map(UserRole::getName)
                .collect(Collectors.toSet());

        boolean hasAnyRole = Arrays.stream(allowedRoles)
                .anyMatch(userRoles::contains);

        if (!hasAnyRole) {
            throw new AuthorizationException();
        }
    }
}
