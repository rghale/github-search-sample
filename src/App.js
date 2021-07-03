/**
 * --------------------------------------------------------------------------
 * Application
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { withRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import SearchBar from './components/SearchBar';
import SideMenu from './components/SideMenu';

import Repository from './components/lists/Repository';
import Issue from './components/lists/Issue';
import Topic from './components/lists/Topic';
import User from './components/lists/User';

import './assets/styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
	render() {
		return (
			<>
				<SearchBar />
				<Container className='gth-main-container'>
					<Row>
						<Col lg={3} sm={3} xs={12}>
							<SideMenu />
						</Col>
						<Col lg={9} sm={9} xs={12}>
							<Switch>
								<Route path='/repositories' component={Repository} />
								<Route path='/issues' component={Issue} />
								<Route path='/topics' component={Topic} />
								<Route path='/users' component={User} />
								<Redirect to='/repositories' />
							</Switch>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default withRouter(App);
