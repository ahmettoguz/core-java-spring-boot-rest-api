package com.aoe.restapi.model.service.relational.userissue;

import com.aoe.restapi.model.entity.Issue;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.Issue.IssueService;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserIssueServiceImpl implements UserIssueService {

    private final UserService<User> userService;
    private final IssueService<Issue> issueService;

    @Autowired
    public UserIssueServiceImpl(UserService<User> userService,
                                IssueService<Issue> issueService) {
        this.userService = userService;
        this.issueService = issueService;
    }

    @Override
    public OperationStatus manageUserIssue(boolean link, int userId, int issueId) {
        // read operation for user
        OperationStatus userOperation = userService.readById(userId);

        if (userOperation instanceof OperationStatusError)
            return userOperation;

        // read operation for issue
        OperationStatus issueOperation = issueService.readById(issueId);

        if (issueOperation instanceof OperationStatusError)
            return issueOperation;

        // get user and domain
        User user = ((OperationStatusSuccess<User>) userOperation).getData();
        Issue issue = ((OperationStatusSuccess<Issue>) issueOperation).getData();

        // get issue set
        Set<Issue> issueSet = user.getIssueSet();

        // update user's issue
        if (link) {
            // link
            // check user has this issue
            if (issueSet.contains(issue))
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user has this issue already");

            // add issue to user
            issueSet.add(issue);
        } else {
            // unlink
            // check user has not that issue
            if (!issueSet.contains(issue))
                return new OperationStatusError(HttpStatus.BAD_REQUEST, "user has not that issue already");

            issueSet.remove(issue);
        }

        // return
        return userService.update(user);
    }
}