package com.aoe.restapi.aspect;

import com.aoe.restapi.utility.auth.JwtUtil;
import com.aoe.restapi.utility.httputil.HttpUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Order(1)
@Component
public class SecurityAspect {

    private JwtUtil jwtUtil;

    public SecurityAspect(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
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
        // get token from header
        String jwtToken = HttpUtil.getTokenFromHeader();

        // validate jwt token
        if (!jwtUtil.validateToken(jwtToken))
            System.out.println("Jwt not valid");
        // todo throw ex and handle it


//        // Get the arguments
//        Object[] args = joinPoint.getArgs();
//
//        // Check if there are any arguments
//        if (args.length == 0) {
//            // Throw an exception if no arguments are found
//            throw new IllegalArgumentException("No arguments provided to the method.");
//        }
//
//        // Print the first argument
//        System.out.println("First argument: " + args[0].toString());


        Object[] args = joinPoint.getArgs();
        System.out.println("Arguments:");
        for (Object a : args)
            System.out.println(a.toString());

//
//        MethodSignature msig = (MethodSignature) joinPoint.getSignature();
//
//
//        System.out.println("infos about aop:\nSigniture: " + msig);
//
//
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