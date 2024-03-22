package com.aoe.restapi.aspect;

import com.aoe.restapi.controller.domain.DomainRestControllerImpl;
import com.aoe.restapi.exception.exception.CommonException;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.facade.UtilFacade;
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

    private final UtilFacade utilFacade;
    private final UserService<User> userService;
    private final AspectFacade aspectFacade;

    @Autowired
    public SecurityAspect(UtilFacade utilFacade, UserService<User> userService, AspectFacade aspectFacade) {
        this.utilFacade = utilFacade;
        this.userService = userService;
        this.aspectFacade = aspectFacade;
    }

    // ---------------------------------------------------- pointcut declarations
    // pointcut for all endpoints except login
    @Pointcut("execution(* com.aoe.restapi.controller..*(..)) " +
            "&& !execution(* com.aoe.restapi.controller.auth.*.login(..))")
    public void order00_commonJwtAuthentication() {
    }

    // pointcut for all endpoints
    @Pointcut("execution(* com.aoe.restapi.controller..*(..)) " +
            "&& !execution(* com.aoe.restapi.controller.auth.*.login(..))")
    private void order01_genericController() {
    }

    // advice for role authentication
    @Before("order01_genericController()")
    public void order01_genericController(JoinPoint joinPoint) {
        // perform jwt operations
        int userId = utilFacade.getIdFromJwtHeader();

        // read user
        OperationStatus operationStatus = userService.readById(userId);

        // check user
        // todo will not need that
        if (operationStatus instanceof OperationStatusError)
            throw new CommonException();

        // get user
        User user = (User) ((OperationStatusSuccess) operationStatus).getData();


        // check if user have project management role
//        AopUtil.checkAuthentication(user, new String[]{"project manager"});


        // get target of the advice
        Object targetClass = joinPoint.getTarget();
        String targetMethodName = joinPoint.getSignature().getName();

        System.out.println("targetMethodName: " + targetMethodName);
        System.out.println("targetClass: " + targetClass);

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
        }
    }

    //
//
//    // pointcut user
//    @Pointcut("execution(* com.aoe.restapi.controller.user.*.updateUserPassword(..))")
//    private void order02_updateUserPassword() {
//    }
//
//
//    // pointcut for role authentications
////    @Pointcut("execution(* com.aoe.restapi.controller.relational.userissue.*.addIssueToUser(..)) " +
////            "|| execution(* com.aoe.restapi.controller.relational.userproject.*.addUserToProject(..)) " +
////            "|| execution(* com.aoe.restapi.controller.relational.userproject.*.addUserToProject(..))")
////    private void order01_projectManagerAccess() {
////    }
//
//
//    // pointcut common
//    @Pointcut("execution(* com.aoe.restapi.controller.relational.userissue.*.addIssueToUser(..)) " +
//            "|| execution(* com.aoe.restapi.controller.relational.userproject.*.addUserToProject(..))")
//    private void order03_relationalBindCommon() {
//    }
//
//
//    // ---------------------------------------------------- advices
    // advice for all except login
    @Before("order00_commonJwtAuthentication()")
    public void order00_commonJwtAuthentication(JoinPoint joinPoint) {
        utilFacade.commonJwtAuthentication();
    }
//
//    // advice for role authentication
//    @Before("order01_projectManagerAccess()")
//    public void order01_projectManagerAccess(JoinPoint joinPoint) {
//        Object target = joinPoint.getTarget();
//
////        if (!(target instanceof IssueRestControllerImpl<?>) && !(target instanceof ProjectRest<?>)) {
////            return;
////        }
//
//        // perform jwt operations
//        int userId = utilFacade.getIdFromJwtHeader();
//
//        // read user
//        OperationStatus operationStatus = userService.readById(userId);
//
//        // check user
//        // todo will not need that
//        if (operationStatus instanceof OperationStatusError)
//            throw new CommonException();
//
//        // get user
//        User user = (User) ((OperationStatusSuccess) operationStatus).getData();
//
//        // check if user have project management role
//        AopUtil.checkAuthentication(user, new String[]{"project manager"});
//    }
//
//    // advice user
//    @Before("order02_updateUserPassword()")
//    public void order02_updateUserPassword(JoinPoint joinPoint) {
//        // perform jwt operations
//        int userId = utilFacade.getIdFromJwtHeader();
//
//        // get arguments
//        Object[] args = aopUtil.getArguments(joinPoint);
//
//        // get target id from argument
//        int targetId = Integer.parseInt(args[0].toString());
//
//        if (userId != targetId)
//            throw new AuthorizationException();
//    }
//
//    // advice common
//    @Before("order03_relationalBindCommon()")
//    public void order03_relationalBindCommon(JoinPoint joinPoint) {
//        // perform jwt operations
//        int userId = utilFacade.getIdFromJwtHeader();
//
//        // read user
//        OperationStatus operationStatus = userService.readById(userId);
//
//        // check user
//        // todo will not need that
//        if (operationStatus instanceof OperationStatusError)
//            throw new CommonException();
//
//        // get user
//        User user = (User) ((OperationStatusSuccess) operationStatus).getData();
//
//        // check if user have project management role
//        AopUtil.checkAuthentication(user, new String[]{"project manager"});
//    }
//


}