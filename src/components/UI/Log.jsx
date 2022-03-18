import React from 'react';
import Typography from '@mui/material/Typography';

const Log = ({ log, ...props }) => {
	return (
		<Typography>{JSON.stringify(log)}</Typography>
	)
}

export default (Log)