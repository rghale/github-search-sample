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

class Repository extends React.Component {
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
                        <FontAwesomeIcon icon={faCode} />
                    </div>
                    <div className='gth-content'>
                        <a href={this.props.item.html_url} target='_blank' rel="noreferrer" title={this.props.item.full_name}>
                            {this.props.item.full_name}
                        </a>
                        <div>
                            {this.props.item.description}
                        </div>
                    </div>
                </div>
        }

        return result;
    }
}

export default Repository;