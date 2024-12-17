
package com.aoe.restapi.model.service.relational.userrole;

import com.aoe.restapi.utility.status.OperationStatus;

public interface UserRoleService<T> {
    OperationStatus manageUserRole(boolean link, int userId, int roleId);
}
