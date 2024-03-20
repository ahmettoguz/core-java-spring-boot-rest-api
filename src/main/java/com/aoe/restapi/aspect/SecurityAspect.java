package com.aoe.restapi.aspect;

import com.aoe.restapi.exception.exception.AuthenticationException;
import com.aoe.restapi.exception.exception.AuthorizationException;
import com.aoe.restapi.exception.exception.CommonException;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.aop.AopUtil;
import com.aoe.restapi.utility.facade.UtilFacade;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Order(1)
@Component
public class SecurityAspect {

    private final UtilFacade utilFacade;
    private final AopUtil aopUtil;
    private final UserService<User> userService;

    @Autowired
    public SecurityAspect(UtilFacade utilFacade, AopUtil aopUtil, UserService<User> userService) {
        this.utilFacade = utilFacade;
        this.aopUtil = aopUtil;
        this.userService = userService;
    }

    // ---------------------------------------------------- pointcut declarations
    // pointcut user
    @Pointcut("execution(* com.aoe.restapi.controller.user.*.updateUserPassword(..))")
    private void updateUserPassword() {
    }

    // pointcut common
    @Pointcut("execution(* com.aoe.restapi.controller.relational.userissue.*.addIssueToUser(..)) " +
            "|| execution(* com.aoe.restapi.controller.relational.userproject.*.addUserToProject(..))")
    private void relationalBindCommon() {
    }


    // ---------------------------------------------------- advices
    // advice user
    @Before("updateUserPassword()")
    public void updateUserPassword(JoinPoint joinPoint) {
        // perform jwt operations
        int userId = utilFacade.performJwtOperations();

        // get arguments
        Object[] args = aopUtil.getArguments(joinPoint);

        // get target id from argument
        int targetId = Integer.parseInt(args[0].toString());

        if (userId != targetId)
            throw new AuthorizationException();
    }

    // advice common
    @Before("relationalBindCommon()")
    public void relationalBindCommon(JoinPoint joinPoint) {
        // perform jwt operations
        int userId = utilFacade.performJwtOperations();

        // read user
        OperationStatus operationStatus = userService.readById(userId);

        // check user
        // todo will not need that
        if (operationStatus instanceof OperationStatusError)
            throw new CommonException();

        // get user
        User user = (User) ((OperationStatusSuccess) operationStatus).getData();

        // check if user have project management role
        if (!user.getRoleSet().stream().anyMatch(role -> role.getName().equals("project manager")))
            throw new AuthenticationException();
    }
}