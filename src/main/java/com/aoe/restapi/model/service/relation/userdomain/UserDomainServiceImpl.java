package com.aoe.restapi.model.service.relation.userdomain;

import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.domain.DomainService;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserDomainServiceImpl implements UserDomainService {

    private final UserService<User> userService;
    private final DomainService<Domain> domainService;

    @Autowired
    public UserDomainServiceImpl(UserService<User> userService,
                                 DomainService<Domain> domainService) {
        this.userService = userService;
        this.domainService = domainService;
    }

    @Override
    public OperationStatus manageUserInDomain(boolean link, int userId, int domainId) {
        // read operation for user
        OperationStatus userOperation = userService.readById(userId);

        if (userOperation instanceof OperationStatusError)
            return userOperation;

        // read operation for project
        OperationStatus domainOperation = domainService.readById(domainId);

        if (domainOperation instanceof OperationStatusError)
            return domainOperation;

        // get user and project
        User user = ((OperationStatusSuccess<User>) userOperation).getData();
        Domain domain = ((OperationStatusSuccess<Domain>) domainOperation).getData();

        //update user's domain
        if (link) {
            // link
            // check user has any domain
            if (user.getDomain() != null)
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user has domain already");

            // set domain to user
            user.setDomain(domain);

        } else {
            // unlink
            // check user has not that domain
            if (user.getDomain() == null || user.getDomain() != domain)
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user has not that domain already");

            user.setDomain(null);
        }

        // return
        return userService.update(user);
    }
}