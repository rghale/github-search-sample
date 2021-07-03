/**
 * --------------------------------------------------------------------------
 * Search bar
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Form } from 'react-bootstrap';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        let urlParams = {};
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            urlParams[key] = value;
        });
        this.state = {
            query: urlParams.q
        };
        this.searchBox = null;
        this.lastQuery = null;
        this.doSearch = this.doSearch.bind(this);
        this.changeQuery = this.changeQuery.bind(this);
    }

    doSearch(event) {
        event.preventDefault();
        if (this.lastQuery === this.state.query) {
            return;
        }
        this.lastQuery = this.state.query;
        let urlParams = {};
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            urlParams[key] = value;
        });
        delete urlParams.p;
        if (this.state.query) {
            urlParams.q = this.state.query;
        }
        else {
            delete urlParams.q;
        }
        let params = [];
        Object.keys(urlParams).forEach(key => {
            params.push(`${key}=${encodeURIComponent(urlParams[key])}`);
        })
        params = params.join('&');
        params = params ? '?' + params : '';
        this.props.history.push(`${this.props.location.pathname}${params}`);
    }

    changeQuery(event) {
        this.setState({
            query: String(event.target.value).trim()
        });
    }

    render() {
        document.addEventListener('keydown', event => {
            if (event.key === '/' && event.target !== this.searchBox) {
                this.searchBox && this.searchBox.focus();
                event.preventDefault();
            }
        });

        return (
            <Navbar className='gth-search-bar' expand='lg'>
                <Form className='gth-search-form' onSubmit={this.doSearch}>
                    <Logo className='gth-logo' />
                    <Form.Control className='gth-input' type='text' placeholder='Search' aria-label='Search' defaultValue={this.state.query} onChange={this.changeQuery} ref={ref => this.searchBox = ref} />
                    <span className='gth-short-key'>/</span>
                </Form>
            </Navbar>
        );
    }
}

export default withRouter(SearchBar);