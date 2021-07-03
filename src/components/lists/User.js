/**
 * --------------------------------------------------------------------------
 * Users list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import BaseList from './BaseList';

class User extends BaseList {
    constructor(props) {
        super(props);
        this.type = 'users';
        this.title = 'Users';
    }

    renderItem(key, item) {
        let result = null;
        if (!item) {
            result =
                <div className='gth-item gth-s-item' key={key}>
                    <span className='gth-s-image'>
                        <Skeleton />
                    </span>
                    <span className='gth-s-text'>
                        <Skeleton />
                    </span>
                </div>
        }
        else {
            result =
                <div className='gth-item' key={key}>
                    <img src={`${item.avatar_url}&s=80`} alt={item.login} title={item.login} />
                    <a href={item.html_url} target='_blank' rel="noreferrer" title={item.login}>
                        {item.login}
                    </a>
                </div>
        }

        return result;
    }
}

export default User;