/**
 * --------------------------------------------------------------------------
 * Pager
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

class Pager extends React.Component {

    getUrlParams(urlParams, page = null) {
        let urlParamsArray = [];
        if (page) {
            urlParams['p'] = page;
        }
        for (let idx in urlParams) {
            urlParamsArray.push(idx + "=" + urlParams[idx]);
        }
        if (!urlParamsArray.length) {
            return '';
        }
        return '?' + urlParamsArray.join('&');
    }

    render() {
        let pager = null;
        let urlParams = {};
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            urlParams[key] = value;
        });
        if (this.props.itemsCount > this.props.itemsPerPage) {
            let pagesCount = Math.ceil(this.props.itemsCount / this.props.itemsPerPage);
            if (this.props.maxResult < this.props.itemsCount) {
                pagesCount = Math.ceil(this.props.maxResult / this.props.itemsPerPage);
            }
            let path = this.props.location.pathname;
            let currentPage = parseInt(urlParams.p);
            if (currentPage <= 1 || isNaN(currentPage)) {
                currentPage = 1;
            }
            pager = (
                <Pagination className="justify-content-center">
                    {(() => {
                        let pagerItems = [];
                        if (pagesCount > 10) {
                            pagerItems.push(
                                <li className="page-item" key="pager-first">
                                    <Link to={path + this.getUrlParams(urlParams, 1)} className="page-link" role="button">
                                        <span aria-hidden="true"><FontAwesomeIcon icon={faAngleDoubleLeft} /> First</span>
                                        <span className="sr-only">First</span>
                                    </Link>
                                </li>
                            );
                            pagerItems.push(
                                <li className="page-item" key="pager-prev">
                                    <Link to={path + this.getUrlParams(urlParams, currentPage - 1 >= 1 ? currentPage - 1 : 1)} className="page-link" role="button">
                                        <span aria-hidden="true"><FontAwesomeIcon icon={faAngleLeft} /> Previous</span>
                                        <span className="sr-only">Previous</span>
                                    </Link>
                                </li>
                            );
                        }
                        let start = Math.max(1, currentPage - 2);
                        let end = Math.min(pagesCount, currentPage + 2);
                        if (end - start < 5) {
                            end = Math.min(pagesCount, start + 4);
                        }
                        if (end - start < 5) {
                            start = Math.max(1, end - 4);
                        }
                        for (let idx = start; idx <= end; idx++) {
                            if (idx === currentPage) {
                                pagerItems.push(
                                    <Pagination.Item active key={"pager-" + idx}>{idx}</Pagination.Item>
                                );
                            }
                            else {
                                pagerItems.push(
                                    <li key={"pager-" + idx}>
                                        <Link to={path + this.getUrlParams(urlParams, idx)} className="page-link" role="button">{idx}</Link>
                                    </li>
                                );
                            }
                        }
                        if (pagesCount > 10) {
                            pagerItems.push(
                                <li className="page-item" key="pager-next">
                                    <Link to={path + "?page=" + this.getUrlParams(urlParams, currentPage + 1 <= pagesCount ? currentPage + 1 : pagesCount)} className="page-link" role="button">
                                        <span aria-hidden="true">Next <FontAwesomeIcon icon={faAngleRight} /></span>
                                        <span className="sr-only">Next</span>
                                    </Link>
                                </li>
                            );
                            pagerItems.push(
                                <li className="page-item" key="pager-last">
                                    <Link to={path + this.getUrlParams(urlParams, pagesCount)} className="page-link" role="button">
                                        <span aria-hidden="true">Last <FontAwesomeIcon icon={faAngleDoubleRight} /></span>
                                        <span className="sr-only">Last</span>
                                    </Link>
                                </li>
                            );
                        }
                        return pagerItems;
                    })()}
                </Pagination>
            );
        }
        return pager;
    }
}

export default withRouter(Pager);