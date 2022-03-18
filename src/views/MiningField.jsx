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

const MiningField = (props) => {

	const [logs, setLogs] = useState([])
	const [login] = useState('xxx')
	const [password] = useState('xxx')
	const [accessToken, setAccessToken] = useState('')

	const post = (data, cb) => {
		console.log(accessToken)
		api.post(data, { accessToken }).then(({ data }) => {
			setLogs([...logs, data])
			if (cb) cb(data)
		}).catch((data) => setLogs([...logs, data]))
	}

	const get = (data) => {
		api.get(data, { accessToken }).then(({ data }) => setLogs([...logs, data])).catch((data) => setLogs([...logs, data]))
	}

	useEffect(() => {
		post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))
	}, [])

	return (
		<Row>
			<Col xs={6}>

				<form onSubmit={(e) => post({ path: 'mining_field', data: parseForm(e, ['x', 'y', 'type', 'size']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" value={5} />
							<TextField name="y" label="Y" variant="outlined" value={5} />
							<TextField name="type" label="Type" variant="outlined" />
							<TextField name="size" label="Size" variant="outlined" value={2} />
						</div>
						<Button variant="contained" color="warning" type="submit">
							Создать веселую ферму
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => post({ path: 'mining_field/start', data: parseForm(e, ['id']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="id" label="id" variant="outlined" />
						</div>
						<Button variant="contained" color="warning" type="submit">
							Начать майнинг
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => get({ path: 'mining_field', data: parseForm(e, ['id']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="id" label="id" variant="outlined" />
						</div>
						<Button variant="contained" color="success" type="submit">
							Получить инфу по майнингу
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => post({ path: 'mining_field/stop', data: parseForm(e, ['id']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="id" label="id" variant="outlined" />
						</div>
						<Button variant="contained" color="warning" type="submit">
							Остановить майнинг
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

export default (MiningField)