/**
 * --------------------------------------------------------------------------
 * Topics list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import BaseList from './BaseList';

class Topic extends BaseList {
    constructor(props) {
        super(props);
        this.type = 'topics';
        this.title = 'Topics';
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
                        <FontAwesomeIcon icon={faHashtag} />
                    </div>
                    <div className='gth-content'>
                        <a className='gth-title' href={`https://github.com/topics/${item.name}`} target='_blank' rel="noreferrer" title={item.name}>
                            {item.name}
                        </a>
                        <div className='gth-description'>
                            {item.short_description}
                        </div>
                    </div>
                </div>
        }

        return result;
    }
}

export default Topic;