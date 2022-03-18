import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Row, Col } from 'react-bootstrap'
import api from '../api/api'
import styled from 'styled-components'
import Log from '../components/UI/Log'
import { parseForm } from '../lib/lib';

const Logs = styled.div`
	border: 1px solid black;
`

const VerticalFlex = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`

const Warehouse = (props) => {

	const [logs, setLogs] = useState([])
	const [login] = useState('xxx')
	const [password] = useState('xxx')
	const [accessToken, setAccessToken] = useState('')

	const post = (data, cb) => {
		api.post(data, { accessToken }).then(({ data }) => {
			setLogs([...logs, data])
			if (cb) cb(data)
		}).catch((data) => setLogs([...logs, data]))
	}

	const get = (data) => {
		api.get(data, { accessToken }).then(({ data }) => setLogs([...logs, data])).catch((data) => setLogs([...logs, data]))
	}

	const del = (data) => {
		api.delete(data, { accessToken }).then(({ data }) => setLogs([...logs, data])).catch((data) => setLogs([...logs, data]))
	}

	useEffect(() => {
		post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))
	}, [])

	return (
		<Row>
			<Col xs={6}>
				<form onSubmit={(e) => post({ path: 'warehouse', data: parseForm(e, ['capacity', 'x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="capacity" label="Capacity" variant="outlined" value={5} />
							<TextField name="x" label="X" variant="outlined" value={5} />
							<TextField name="y" label="Y" variant="outlined" value={5} />
						</div>
						<Button variant="contained" color="warning" type="submit">
							Создать склад
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => del({ path: 'warehouse', data: parseForm(e, ['id']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="id" label="Id" variant="outlined" />
						</div>
						<Button variant="contained" color="error" type="submit">
							Удалить склад
						</Button>
					</VerticalFlex>
				</form>
			</Col>
			<Col xs={6}>
				<Logs>
					{logs.map((log, index) => <Log key={index} log={log} />)}
				</Logs>
				<VerticalFlex>
					<Button variant="contained" color="error" onClick={() => setLogs([])}>
						Очистить логи
					</Button>
				</VerticalFlex>
			</Col>
		</Row>
	)
}

export default (Warehouse)