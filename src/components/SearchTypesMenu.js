/**
 * --------------------------------------------------------------------------
 * Search types menu
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { searchTypes, defaultSearchType } from './searchResult/ComponentsList';

class SearchTypesMenu extends React.Component {
    render() {
        let params = [];
        let currentType = null;
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            if (key !== 't' && key !== 'p') {
                params.push(`${key}=${encodeURIComponent(value)}`);
            }
            if (key === 't') {
                currentType = value;
            }
        });
        if (!currentType) {
            currentType = defaultSearchType;
        }
        params = params.join('&');
        params = params ? '&' + params : '';
        let items = [];
        Object.keys(searchTypes).forEach(type => {
            items.push(
                <Link to={`${this.props.location.pathname}?t=${type}${params}`} key={type} className={currentType === type ? 'gth-active' : ''}>
                    {searchTypes[type].title}
                </Link>
            );
        });
        return (
            <nav className='gth-search-types-block'>
                {items}
            </nav>
        );
    }
}

export default withRouter(SearchTypesMenu);