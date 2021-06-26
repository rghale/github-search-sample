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

class Topic extends React.Component {
    render() {
        let result = null;
        if (!this.props.item) {
            result =
                <div className='gth-item gth-s-item'>
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
                <div className='gth-item'>
                    <div className='gth-icon-container'>
                        <FontAwesomeIcon icon={faHashtag} />
                    </div>
                    <div className='gth-content'>
                        <a className='gth-title' href={`https://github.com/topics/${this.props.item.name}`} target='_blank' rel="noreferrer" title={this.props.item.name}>
                            {this.props.item.name}
                        </a>
                        <div className='gth-description'>
                            {this.props.item.short_description}
                        </div>
                    </div>
                </div>
        }

        return result;
    }
}

export default Topic;