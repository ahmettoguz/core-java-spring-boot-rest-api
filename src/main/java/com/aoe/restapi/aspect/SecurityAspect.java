package com.aoe.restapi.aspect;

import com.aoe.restapi.exception.exception.AuthorizationException;
import com.aoe.restapi.utility.aop.AopUtil;
import com.aoe.restapi.utility.facade.UtilFacade;
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

    @Autowired
    public SecurityAspect(UtilFacade utilFacade, AopUtil aopUtil) {
        this.utilFacade = utilFacade;
        this.aopUtil = aopUtil;
    }

    // ---------------------------------------------------- pointcut declarations
    // pointcut user
    @Pointcut("execution(* com.aoe.restapi.controller.user.*.updateUserPassword(..))")
    private void updateUserPassword() {
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
}