package com.aoe.restapi.aspect;

import com.aoe.restapi.exception.exception.AuthorizationException;
import com.aoe.restapi.exception.exception.JwtNotValidException;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.aop.AopUtil;
import com.aoe.restapi.utility.auth.JwtUtil;
import com.aoe.restapi.utility.facade.UtilFacade;
import com.aoe.restapi.utility.http.HttpUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Aspect
@Order(1)
@Component
public class SecurityAspect {
    private JwtUtil jwtUtil;

    private UtilFacade utilFacade;
    private AopUtil aopUtil;

    public SecurityAspect(JwtUtil jwtUtil, UtilFacade utilFacade, AopUtil aopUtil) {
        this.jwtUtil = jwtUtil;
        this.utilFacade = utilFacade;
        this.aopUtil = aopUtil;
    }

    @Autowired


    // pointcut declarations
    @Pointcut("execution(* readAllUsers(..))")
    private void pointcutRead() {
    }

    // pointcut user
    @Pointcut("execution(* com.aoe.restapi.controller.user.*.updateUserPassword(..))")
    private void updateUserPassword() {
    }

    // advices

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

//        MethodSignature msig = (MethodSignature) joinPoint.getSignature();
//        System.out.println("infos about aop:\nSigniture: " + msig);
    }

    @Before("pointcutRead()")
    public void beforeReadAllUsers(JoinPoint joinPoint) {

        MethodSignature msig = (MethodSignature) joinPoint.getSignature();

        Object[] args = joinPoint.getArgs();

        System.out.println("infos about aop:\nSigniture: " + msig);

        System.out.println("Arguments:");

        for (Object a : args)
            System.out.println(a.toString());

        System.out.println("@Before is running for: readAllUsers");
//        try {
//            throw new Exception("Execution halted by advice.");
//        } catch (Exception e) {
//            e.printStackTrace(); // Handle the exception as per your requirement
//        }
    }

    @Before("execution(* common*(..))")
    public void beforeCommonOperation() {
        System.out.println("@Before is running for: commonOperation, security aspect");
    }
}