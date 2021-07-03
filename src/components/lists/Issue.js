/**
 * --------------------------------------------------------------------------
 * Issues list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import BaseList from './BaseList';

class Issue extends BaseList {
    constructor(props) {
        super(props);
        this.type = 'issues';
        this.title = 'Issues';
    }

    renderItem(key, item) {
        let result = null;
        if (!item) {
            result =
                <div className='gth-item gth-s-item' key={key}>
                    <div className='gth-icon-container'>
                        <Skeleton className='gth-icon-skeleton' />
                    </div>
                    <div className='gth-content'>
                        <Skeleton className='gth-sub-title-skeleton' />
                        <br />
                        <Skeleton className='gth-title-skeleton' />
                        <div>
                            <Skeleton className='gth-description-skeleton' />
                        </div>
                    </div>
                </div>
        }
        else {
            let body = String(item.body);
            let repositoryName = String(item.html_url);
            repositoryName = repositoryName.replace('https://github.com/', '').replace('/issues/' + item.number, '');
            if (body.length > 100) {
                body = body.substr(0, 100) + '...';
            }
            result =
                <div className='gth-item' key={key}>
                    <div className='gth-icon-container'>
                        <FontAwesomeIcon icon={item.pull_request ? faCodeBranch : faDotCircle} />
                    </div>
                    <div className='gth-content'>
                        <a className='gth-sub-title' href={item.html_url} target='_blank' rel="noreferrer">{repositoryName} #{item.number}</a>
                        <a className='gth-title' href={item.user.html_url} target='_blank' rel="noreferrer">
                            {item.user.login}
                        </a>
                        <div className='gth-description'>
                            {body}
                        </div>
                    </div>
                </div>
        }

        return result;
    }
}

export default Issue;