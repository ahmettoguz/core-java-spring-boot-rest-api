
package com.aoe.restapi.model.service.relational.userrole;

import com.aoe.restapi.model.entity.Role;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.role.RoleService;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserRoleServiceImpl<T extends Role> implements UserRoleService<T> {

    private final UserService<User> userService;
    private final RoleService<Role> roleService;

    @Autowired
    public UserRoleServiceImpl(UserService<User> userService, RoleService<Role> roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public OperationStatus manageUserRole(boolean link, int userId, int roleId) {
        // read operation for user
        OperationStatus userOperation = userService.readById(userId);

        if (userOperation instanceof OperationStatusError)
            return userOperation;

        // read operation for role
        OperationStatus roleOperation = roleService.readById(roleId);

        if (roleOperation instanceof OperationStatusError)
            return roleOperation;

        // get user and role
        User user = ((OperationStatusSuccess<User>) userOperation).getData();
        Role role = ((OperationStatusSuccess<Role>) roleOperation).getData();

        // get role set
        Set<Role> roleSet = user.getRoleSet();

        // update user's role
        if (link) {
            // link
            // check user has this issue
            if (roleSet.contains(role))
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user has this role already");

            // set issue to user
            roleSet.add(role);
        } else {
            // unlink
            // check user has not that issue
            if (!roleSet.contains(role))
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user has not that role already");

            // remove issue from user
            roleSet.remove(role);
        }

        // return
        return userService.update(user);
    }
}