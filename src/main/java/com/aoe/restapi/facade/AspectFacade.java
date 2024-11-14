package com.aoe.restapi.facade;

import com.aoe.restapi.exception.exception.ArgException;
import com.aoe.restapi.exception.exception.AuthorizationException;
import com.aoe.restapi.exception.exception.JwtNotValidException;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.entity.Role;
import com.aoe.restapi.utility.auth.JwtUtil;
import com.aoe.restapi.utility.http.HttpUtil;
import org.aspectj.lang.JoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AspectFacade {

    private final JwtUtil jwtUtil;

    @Autowired
    public AspectFacade(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public int getArgument(JoinPoint joinPoint, int argumentIndex) {
        // get the arguments
        Object[] args = joinPoint.getArgs();

        // check arguments
        if (args.length == 0)
            throw new ArgException();

        return Integer.parseInt(args[argumentIndex].toString());
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

    public void restrictAccess() {
        throw new AuthorizationException();
    }

    public boolean authorizeWithId(User user, JoinPoint joinPoint) {
        // get target id from argument
        int targetId = this.getArgument(joinPoint, 0);

        // get user id
        int userId = user.getId();


        if (userId != targetId)
            return false;
        return true;
    }

    public boolean authorizeWithRole(User user, String[] allowedRoles) {
        Set<String> userRoles = user.getRoleSet().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        boolean hasAnyRole = Arrays.stream(allowedRoles)
                .anyMatch(userRoles::contains);

        return hasAnyRole;
    }

    public boolean compareIdWithList(List<Integer> userHasIds, int targetId) {
        if (!userHasIds.contains(targetId))
            return false;
        return true;
    }

    public boolean authorizeUserHaveIssueId(User user, JoinPoint joinPoint) {
        // get target id from argument
        int targetId = this.getArgument(joinPoint, 0);

        // get users issue ids
        List<Integer> userIssueIds = user.getIssueIds();

        // make comparison
        return this.compareIdWithList(userIssueIds, targetId);
    }

    public boolean authorizeUserHaveProjectId(User user, JoinPoint joinPoint) {
        // get target id from argument
        int targetId = this.getArgument(joinPoint, 0);

        // get users issue ids
        List<Integer> userProjectIds = user.getProjectIds();

        // make comparison
        return this.compareIdWithList(userProjectIds, targetId);
    }

    public boolean isTargetUser(JoinPoint joinPoint) {
        // get target id from argument
        int targetId = this.getArgument(joinPoint, 1);

        // make comparison
        return targetId == 1;
    }

}
