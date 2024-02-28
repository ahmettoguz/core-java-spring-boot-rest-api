package com.aoe.restapi.model.service.relational.userproject;

import com.aoe.restapi.model.entity.Project;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.project.ProjectService;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserProjectServiceImpl implements UserProjectService {

    private final UserService<User> userService;
    private final ProjectService<Project> projectService;

    @Autowired
    public UserProjectServiceImpl(UserService<User> userService, ProjectService<Project> projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @Override
    public OperationStatus manageUserInProject(boolean link, int userId, int projectId) {
        // read operation for user
        OperationStatus userOperation = userService.readById(userId);

        if (userOperation instanceof OperationStatusError)
            return userOperation;

        // read operation for project
        OperationStatus projectOperation = projectService.readById(projectId);

        if (projectOperation instanceof OperationStatusError)
            return projectOperation;

        // get user and project
        User user = ((OperationStatusSuccess<User>) userOperation).getData();
        Project project = ((OperationStatusSuccess<Project>) projectOperation).getData();

        // get project set
        Set<Project> projectSet = user.getProjectSet();

        //update project set
        if (link) {
            // link
            // check project if it is already included in set
            if (projectSet.contains(project))
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user is part of this project already");

            // add project
            projectSet.add(project);

        } else {
            // unlink
            // check project if it is not included in set
            if (!projectSet.contains(project))
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user is not part of this project already");

            // remove project
            projectSet.remove(project);
        }

        // return
        return userService.update(user);
    }
}