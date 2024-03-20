package com.aoe.restapi.utility.aop;

import com.aoe.restapi.exception.exception.ArgException;
import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Service;

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
}
