package com.aoe.restapi.aspect;

import com.aoe.restapi.constants.RoleEnum;
import com.aoe.restapi.controller.domain.DomainRestControllerImpl;
import com.aoe.restapi.controller.issue.IssueRestControllerImpl;
import com.aoe.restapi.exception.exception.CommonException;
import com.aoe.restapi.facade.AspectFacade;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SecurityAspect {

    private final UserService<User> userService;
    private final AspectFacade aspectFacade;

    @Autowired
    public SecurityAspect(UserService<User> userService, AspectFacade aspectFacade) {
        this.userService = userService;
        this.aspectFacade = aspectFacade;
    }

    // pointcut for all endpoints except login
    @Pointcut("execution(* com.aoe.restapi.controller..*(..)) " +
            "&& !execution(* com.aoe.restapi.controller.auth.*.login(..))")
    public void commonEndpoint() {
    }

    // advice for role authentication
    @Before("commonEndpoint()")
    public void commonEndpoint(JoinPoint joinPoint) {
        // validate jwt
        aspectFacade.commonJwtAuthentication();

        // perform jwt operations
        int userId = aspectFacade.getIdFromJwtHeader();

        // read user
        OperationStatus operationStatus = userService.readById(userId);

        // check user
        // todo will not need that
        if (operationStatus instanceof OperationStatusError)
            throw new CommonException();

        // get user
        User user = (User) ((OperationStatusSuccess) operationStatus).getData();

        // get target of the advice
        Object targetClass = joinPoint.getTarget();
        String targetMethodName = joinPoint.getSignature().getName();

        // System.out.println("targetMethodName: " + targetMethodName);
        // System.out.println("targetClass: " + targetClass);

        // todo allow admin at the beginning and return if its admin

        // restrict endpoint according to target
        if (targetClass instanceof DomainRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "createInstance": // POST - /domains
                    break;

                case "readInstances": // GET - /domains
                    break;

                case "readInstanceById": // GET - /domains/{id}
                    break;

                case "readAllInstancesPagedSorted": // GET - /domains/paged
                    break;

                case "count": // GET - /domains/count
                    break;

                case "mergeUpdatedInstance": // PUT - /domains/{id}
                    aspectFacade.authorizeWithId(user, joinPoint);
                    break;

                case "deactivateInstanceById": // PATCH - /domains/${id}/deactivate
                    aspectFacade.authorizeWithId(user, joinPoint);
                    break;

                case "activateInstanceById": // PATCH - /domains/${id}/activate
                    aspectFacade.restrictAccess(user, joinPoint);
                    break;

                case "deleteInstance": // DELETE - /domains/${id}
                    aspectFacade.restrictAccess(user, joinPoint);
                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof IssueRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "createInstance": // POST - /issues
                    break;

                case "readInstances": // GET - /issues
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    break;

                case "readInstanceById": // GET - /issues/{id}
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    aspectFacade.authorizeUserHaveIssueId(user, joinPoint);
                    break;

                case "readAllInstancesPagedSorted": // GET - /issues/paged
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    break;

                case "count": // GET - /issues/count
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    break;

                case "mergeUpdatedInstance": // PUT - /issues/{id}
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    aspectFacade.authorizeUserHaveIssueId(user, joinPoint);
                    break;

                case "deactivateInstanceById": // PATCH - /issues/${id}/deactivate
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    aspectFacade.authorizeUserHaveIssueId(user, joinPoint);
                    break;

                case "activateInstanceById": // PATCH - /issues/${id}/activate
                    aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    break;

                case "deleteInstance": // DELETE - /issues/${id}
                    aspectFacade.restrictAccess(user, joinPoint);
                    break;

                default:
                    throw new CommonException();
            }
        }
    }
}