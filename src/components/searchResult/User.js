/**
 * --------------------------------------------------------------------------
 * Users list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';

class User extends React.Component {

    render() {
        let result = null;
        if (!this.props.item) {
            result =
                <div className='gth-item gth-s-item'>
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
                <div className='gth-item'>
                    <img src={`${this.props.item.avatar_url}&s=80`} alt={this.props.item.login} title={this.props.item.login} />
                    <a href={this.props.item.html_url} target='_blank' rel="noreferrer" title={this.props.item.login}>
                        {this.props.item.login}
                    </a>
                </div>
        }

        return result;
    }
}

export default User;