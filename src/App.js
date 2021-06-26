/**
 * --------------------------------------------------------------------------
 * Application
 * Licensed under MIT (https://github.com/rghale/github-search-sample/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import SearchBar from './components/SearchBar';
import Results from './components/Results';
import SearchTypesMenu from './components/SearchTypesMenu';
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
							<SearchTypesMenu />
						</Col>
						<Col lg={9} sm={9} xs={12}>
							<Results />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default withRouter(App);
