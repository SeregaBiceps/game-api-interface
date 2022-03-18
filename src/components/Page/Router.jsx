import React from 'react';
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const Routes = styled('div')({
})

const StyledNavLink = styled(NavLink)({
})


const Router = (props) => {
	return (
		<Routes className="routes">
			<StyledNavLink to={'/main'} className="route">Main</StyledNavLink>
			<StyledNavLink to={'/mining_field'} className="route">Mining field</StyledNavLink>
			<StyledNavLink to={'/resource'} className="route">Resource</StyledNavLink>
			<StyledNavLink to={'/warehouse'} className="route">Warehouse</StyledNavLink>
		</Routes>
	)
}

export default (Router)