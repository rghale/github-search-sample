/**
 * --------------------------------------------------------------------------
 * Base list
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import axios from 'axios';
import Pager from '../Pager';

class BaseList extends React.Component {
    searchAPIUrl = process.env.REACT_APP_SEARCH_API_URL;
    itemPerPage = process.env.REACT_APP_ITEMS_PER_PAGE;
    maxResult = process.env.REACT_APP_MAX_ITEMS;

    constructor(props) {
        super(props);
        let urlParams = this.getUrlParams();
        this.state = {
            result: {},
            loading: true,
            error: null
        }
        this.search = this.search.bind(this);
        this.lastQuery = urlParams.q;
        this.lastPage = null;
        this._mounted = false;
        this.type = 'not_implemented';
        this.title = 'Not Implemented'
    }

    search() {
        let urlParams = this.getUrlParams();
        let query = String(urlParams.q ? urlParams.q : "").trim();
        let page = parseInt(urlParams.p);
        if (page <= 1 || isNaN(page)) {
            page = 1;
        }
        if (this.lastQuery === query && this.lastPage === page) {
            return;
        }
        this.lastQuery = query;
        this.lastPage = page;
        if (query === "") {
            this._mounted && this.setState({
                result: {},
                loading: false,
                error: null
            });
            return;
        }
        axios.get(`${this.searchAPIUrl}${this.type}`, {
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
        this.search();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    renderItem() {
        throw new Error("Not implemented!");
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
            for (let idx = 0; idx < 10; idx++) {
                items.push(this.renderItem(idx));
            }
        }
        else if (this.state.result && this.state.result.items && this.state.result.items.length) {
            this.state.result.items.forEach(item => {
                items.push(this.renderItem(item.id, item));
            });
            hasResult = true;
        }
        else {
            items.push(
                <div className='gth-empty' key='empty'>We couldn’t find any {this.title} matching '{this.lastQuery}'</div>
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
                        <span>{this.title} results</span>
                    </h3>
                </div>
                <div className={`gth-${this.type}-list`}>
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

export default BaseList;