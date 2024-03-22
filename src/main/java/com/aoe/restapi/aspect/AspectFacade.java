package com.aoe.restapi.aspect;

import com.aoe.restapi.exception.exception.ArgException;
import com.aoe.restapi.exception.exception.AuthenticationException;
import com.aoe.restapi.exception.exception.AuthorizationException;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.entity.UserRole;
import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AspectFacade {

    public Object[] getArguments(JoinPoint joinPoint) {
        // get the arguments
        Object[] args = joinPoint.getArgs();

        // check arguments
        if (args.length == 0)
            throw new ArgException();

        return args;
    }

    public void restrictAccess(User user, JoinPoint joinPoint) {
        this.checkAuthentication(user, new String[]{"admin"});
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

    public void checkAuthentication(User user, String[] roles) {
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
