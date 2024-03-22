package com.aoe.restapi.utility.aop;

import com.aoe.restapi.exception.exception.ArgException;
import com.aoe.restapi.exception.exception.AuthenticationException;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.entity.UserRole;
import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AopUtil {
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
