/**
 * --------------------------------------------------------------------------
 * Search result
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Pager from './Pager';
import * as allSearchTypes from './searchResult/ComponentsList';


class Results extends React.Component {
    searchAPIUrl = 'https://api.github.com/search/';
    itemPerPage = 10;
    maxResult = 1000;

    constructor(props) {
        super(props);
        let urlParams = this.getUrlParams();
        this.state = {
            result: {},
            type: allSearchTypes.searchTypes[urlParams.t] ? urlParams.t : allSearchTypes.defaultSearchType,
            loading: true,
            error: null
        }
        this.search = this.search.bind(this);
        this.lastQuery = urlParams.q;
        this.lastPage = null;
        this.lastType = this.state.type;
        this._mounted = false;
    }

    search() {
        let urlParams = this.getUrlParams();
        let query = String(urlParams.q ? urlParams.q : "").trim();
        let page = parseInt(urlParams.p);
        if (page <= 1 || isNaN(page)) {
            page = 1;
        }
        if (this.lastQuery === query && this.lastPage === page && this.lastType === this.state.type) {
            return;
        }
        this.lastQuery = query;
        this.lastPage = page;
        this.lastType = this.state.type;
        if (query === "") {
            this._mounted && this.setState({
                result: {},
                loading: false,
                error: null
            });
            return;
        }
        axios.get(`${this.searchAPIUrl}${this.state.type}`, {
            headers: {
                Accept: 'application/vnd.github.mercy-preview+json',
            },
            params: {
                q: query,
                page: page,
                per_page: this.itemPerPage
            }
        }).then(response => {
            this._mounted && this.setState({
                result: response.data,
                loading: false,
                error: null
            })
        }).catch(error => {
            this.setState({
                error: error
            });
        });
    }

    getUrlParams() {
        let urlParams = {};
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            urlParams[key] = value;
        });
        return urlParams;
    }

    componentDidMount() {
        this._mounted = true;
        this.search();
    }

    componentDidUpdate() {
        let urlParams = this.getUrlParams();
        if (urlParams.t && urlParams.t !== this.state.type) {
            this.setState({
                type: allSearchTypes.searchTypes[urlParams.t] ? urlParams.t : allSearchTypes.defaultSearchType,
                result: {},
                loading: this.lastQuery ? true : false
            });
        }
        else {
            this.search();
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        if (this.state.error) {
            return (
                <div className='gth-error'>
                    {this.state.error.toString()}
                </div>
            );
        }
        if (!this.lastQuery) {
            return (
                <div className='gth-first-view'>
                    Enter the desired phrase in the above search box
                </div>
            );
        }
        let items = [];
        let hasResult = false;
        if (this.state.loading) {
            let SearchComponent = allSearchTypes.searchTypes[this.state.type].component;
            for (let idx = 0; idx < 10; idx++) {
                items.push(
                    <SearchComponent item={null} key={`${this.state.type}template${idx}`} />
                );
            }
        }
        else if (this.state.result && this.state.result.items && this.state.result.items.length) {
            let SearchComponent = allSearchTypes.searchTypes[this.state.type].component;
            this.state.result.items.forEach(item => {
                items.push(
                    <SearchComponent item={item} key={`${this.state.type}${item.id ? item.id : item.name}`} />
                );
            });
            hasResult = true;
        }
        else {
            items.push(
                <div className='gth-empty'>We couldn’t find any {allSearchTypes.searchTypes[this.state.type].title} matching '{this.lastQuery}'</div>
            );
        }
        return (
            <div className='gth-result-list'>
                <div>
                    <h3>
                        {(() => {
                            if (hasResult) {
                                return (<span>{Number(this.state.result && this.state.result.total_count !== undefined ? this.state.result.total_count : 0).toLocaleString('en-us')}</span>);
                            }
                        })()}
                        <span>{allSearchTypes.searchTypes[this.state.type].title} results</span>
                    </h3>
                </div>
                <div className={`gth-${this.state.type}-list`}>
                    {items}
                </div>
                <Pager
                    itemsCount={this.state.result && this.state.result.total_count !== undefined ? this.state.result.total_count : 0}
                    itemsPerPage={this.itemPerPage}
                    location={this.props.location.pathname}
                    maxResult={this.maxResult}
                />
            </div>
        );
    }
}

export default withRouter(Results);