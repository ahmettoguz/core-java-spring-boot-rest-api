package com.aoe.restapi.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Order(2)
@Component
public class LogAspect {
    // advices
    // @Before("execution(public boolean com.aoe.demo.UserService.createUser())")
//    @Before("execution(* createUser(..))")
//    public void beforeReadAllUsersAdvice() {
//        System.out.println("@Before is running for: createUser");
//    }
//
//    @Before("execution(* common*(..))")
//    public void beforeCommonOperation() {
//        System.out.println("@Before is running for: commonOperation, log aspect");
//    }
}
