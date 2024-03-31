package com.aoe.restapi.aspect;

import com.aoe.restapi.constants.RoleEnum;
import com.aoe.restapi.controller.auth.AuthRestControllerImpl;
import com.aoe.restapi.controller.domain.DomainRestControllerImpl;
import com.aoe.restapi.controller.healthcheck.HealthCheckRestControllerImpl;
import com.aoe.restapi.controller.issue.IssueRestControllerImpl;
import com.aoe.restapi.controller.project.ProjectRestControllerImpl;
import com.aoe.restapi.controller.relational.userdomain.UserDomainRestControllerImpl;
import com.aoe.restapi.controller.relational.userissue.UserIssueRestControllerImpl;
import com.aoe.restapi.controller.relational.userproject.UserProjectRestControllerImpl;
import com.aoe.restapi.controller.user.UserRestControllerImpl;
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
    @Pointcut("execution(* com.aoe.restapi.controller..*(..))")
    public void commonEndpoint() {
    }

    // advice for role authentication
    @Before("commonEndpoint()")
    public void commonEndpoint(JoinPoint joinPoint) {
        // get target of the advice
        Object targetClass = joinPoint.getTarget();
        String targetMethodName = joinPoint.getSignature().getName();

        // System.out.println("targetMethodName: " + targetMethodName);
        // System.out.println("targetClass: " + targetClass);

        // allow endpoints that has not any authentication
        if (targetClass instanceof AuthRestControllerImpl && targetMethodName.equalsIgnoreCase("login") ||
                targetClass instanceof UserRestControllerImpl<?> && targetMethodName.equalsIgnoreCase("createInstance") ||
                targetClass instanceof HealthCheckRestControllerImpl
        )
            return;

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

        // allow endpoints for admin
        if (aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.ADMIN.getName()}))
            return;


        boolean isAuthorized = false;

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
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "deactivateInstanceById": // PATCH - /domains/${id}/deactivate
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "activateInstanceById": // PATCH - /domains/${id}/activate
                    aspectFacade.restrictAccess();

                    break;

                case "deleteInstance": // DELETE - /domains/${id}
                    aspectFacade.restrictAccess();

                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof IssueRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "createInstance": // POST - /issues
                    break;

                case "readInstances": // GET - /issues
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readInstanceById": // GET - /issues/{id}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeUserHaveIssueId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readAllInstancesPagedSorted": // GET - /issues/paged
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "count": // GET - /issues/count
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "mergeUpdatedInstance": // PUT - /issues/{id}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeUserHaveIssueId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "deactivateInstanceById": // PATCH - /issues/${id}/deactivate
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeUserHaveIssueId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "activateInstanceById": // PATCH - /issues/${id}/activate
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "deleteInstance": // DELETE - /issues/${id}
                    aspectFacade.restrictAccess();

                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof ProjectRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "createInstance": // POST - /projects
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readInstances": // GET - /projects
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readInstanceById": // GET - /projects/{id}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeUserHaveProjectId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readAllInstancesPagedSorted": // GET - /projects/paged
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "count": // GET - /projects/count
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "mergeUpdatedInstance": // PUT - /projects/{id}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeUserHaveProjectId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "deactivateInstanceById": // PATCH - /projects/${id}/deactivate
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "activateInstanceById": // PATCH - /projects/${id}/activate
                    aspectFacade.restrictAccess();

                    break;

                case "deleteInstance": // DELETE - /projects/${id}
                    aspectFacade.restrictAccess();

                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof UserRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "createInstance": // POST - /users
                    break;

                case "readInstances": // GET - /users
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readInstanceById": // GET - /users/{id}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "readAllInstancesPagedSorted": // GET - /users/paged
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "count": // GET - /users/count
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "searchUsersByExactFirstName": // GET - /users/search/exact
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "searchUsersByPartialFirstName": // GET - /users/search/partial
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "mergeUpdatedInstance": // PUT - /users/{id}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "updateUserPassword": // PATCH - /users/${id}/password
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "deactivateInstanceById": // PATCH - /users/${id}/deactivate
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "activateInstanceById": // PATCH - /users/${id}/activate
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "deleteInstance": // DELETE - /users/${id}
                    aspectFacade.restrictAccess();

                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof UserDomainRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "addDomainToUser": // POST - /users/{userId}/domains/{domainId}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "removeDomainFromUser": // DELETE - /users/{userId}/domains/{domainId}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithId(user, joinPoint);

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof UserIssueRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "addIssueToUser": // POST - /users/${userId}/domains/${domainId}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "removeIssueFromUser": // DELETE - /users/${userId}/domains/${domainId}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                default:
                    throw new CommonException();
            }
        } else if (targetClass instanceof UserProjectRestControllerImpl<?>) {
            switch (targetMethodName) {
                case "addUserToProject": // POST - /users/${userId}/projects/${issueId}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                case "removeUserFromProject": // DELETE - /users/${userId}/issues/${issueId}
                    isAuthorized = isAuthorized ? true : aspectFacade.authorizeWithRole(user, new String[]{RoleEnum.PROJECT_MANAGER.getName()});

                    if (!isAuthorized) aspectFacade.restrictAccess();
                    break;

                default:
                    throw new CommonException();
            }
        }
    }
}