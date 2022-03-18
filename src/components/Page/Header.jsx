import React from 'react';
import Router from './Router';
import { Row, Col } from 'react-bootstrap'

const Header = (props) => {

	return (
		<Row>
			<Col xl={12}>
				<Router />
			</Col>
		</Row>
	)
}

export default (Header)