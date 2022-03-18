import React from 'react'
import Header from '../components/Page/Header';
import { Container } from 'react-bootstrap';

const Layout = ({ children, ...props }) => {
	return (
		<>
			<Header />
			<Container>
				{children}
			</Container>
		</>
	)
}

export default Layout