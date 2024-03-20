package com.aoe.restapi.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Order(1)
@Component
public class SecurityAspect {
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
        System.out.println("updating password");

        // Get the current request
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        // Extract the Authorization header
        String authorizationHeader = request.getHeader("Authorization");

//
//        MethodSignature msig = (MethodSignature) joinPoint.getSignature();
//
//        Object[] args = joinPoint.getArgs();
//
//        System.out.println("infos about aop:\nSigniture: " + msig);
//
//        System.out.println("Arguments:");
//
//        for (Object a : args)
//            System.out.println(a.toString());
//
//        System.out.println("@Before is running for: readAllUsers");
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