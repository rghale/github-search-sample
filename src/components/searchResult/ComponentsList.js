/**
 * --------------------------------------------------------------------------
 * Components list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import Repository from "./Repository";
import Issue from "./Issue";
import Topic from "./Topic";
import User from "./User";

const searchTypes = {
    repositories: {
        title: 'Repositories',
        component: Repository
    },
    issues: {
        title: 'Issues',
        component: Issue
    },
    topics: {
        title: 'Topics',
        component: Topic
    },
    users: {
        title: 'Users',
        component: User
    }
}

const defaultSearchType = 'repositories';

export {
    searchTypes,
    defaultSearchType,
    Repository,
    Issue,
    Topic,
    User,
};