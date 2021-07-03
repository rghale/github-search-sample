import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class SideMenu extends React.Component {
    render() {
        let urlParams = {};
        new URLSearchParams(this.props.location.search).forEach((value, key) => {
            urlParams[key] = value;
        });
        let extraPatams = '';
        if (urlParams.q) {
            extraPatams = `?q=${urlParams.q}`;
        }

        return (
            <nav className='gth-search-types-block'>
                <NavLink to={`/repositories${extraPatams}`} activeClassName='gth-active'>
                    Repositories
                </NavLink>
                <NavLink to={`/issues${extraPatams}`} activeClassName='gth-active'>
                    Issues
                </NavLink>
                <NavLink to={`/topics${extraPatams}`} activeClassName='gth-active'>
                    Topics
                </NavLink>
                <NavLink to={`/users${extraPatams}`} activeClassName='gth-active'>
                    Users
                </NavLink>
            </nav>
        );
    }
}

export default withRouter(SideMenu);
