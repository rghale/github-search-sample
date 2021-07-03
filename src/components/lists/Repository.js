/**
 * --------------------------------------------------------------------------
 * Repositories list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import BaseList from './BaseList';

class Repository extends BaseList {
    constructor(props) {
        super(props);
        this.type = 'repositories';
        this.title = 'Repositories';
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
                        <Skeleton className='gth-title-skeleton' />
                        <div>
                            <Skeleton className='gth-description-skeleton' />
                        </div>
                    </div>
                </div>
        }
        else {
            result =
                <div className='gth-item' key={key}>
                    <div className='gth-icon-container'>
                        <FontAwesomeIcon icon={faCode} />
                    </div>
                    <div className='gth-content'>
                        <a href={item.html_url} target='_blank' rel="noreferrer" title={item.full_name}>
                            {item.full_name}
                        </a>
                        <div>
                            {item.description}
                        </div>
                    </div>
                </div>
        }

        return result;
    }
}

export default Repository;