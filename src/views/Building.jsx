import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Row, Col } from 'react-bootstrap'
import api from '../api/api'
import styled from 'styled-components'
import Logs from '../components/UI/Logs'
import { parseForm } from '../lib/lib';

const VerticalFlex = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`

const Building = (props) => {

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
			<VerticalFlex>
				<Button variant="get" onClick={() => get({ path: 'building/type' })}>
					Получить тип постройки
				</Button>
			</VerticalFlex>

			<VerticalFlex>
				<Button variant="get" onClick={() => get({ path: 'building' })}>
					Получить постройки 
				</Button>
			</VerticalFlex>

			<form onSubmit={(e) => get({ path: 'building/:bid', data: parseForm(e, ['type']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="type" label="type" variant="outlined" />
						</div>
						<Button variant="get" type="submit">
							Получить постройку
						</Button>
					</VerticalFlex>
			</form>

                <form onSubmit={(e) => post({ path: `building/${parseForm(e, ['type']).type}`, data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="type" label="type" variant="outlined" margin="dense"/>
							<TextField name="x" label="X" variant="outlined" margin="dense"/>
							<TextField name="y" label="Y" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Создать постройку
						</Button>
					</VerticalFlex>
				</form>

                <form onSubmit={(e) => post({ path: 'building/delete/:bid', data: parseForm(e, ['bid']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="bid" label="bId" variant="outlined" margin="dense"/>
						</div>
						<Button variant="post" type="submit">
							Уничтожить строение
						</Button>
					</VerticalFlex>
				</form>

			</Col>
			<Col xs={6}>
				<Logs logs={logs}/>
				<VerticalFlex>
					<Button variant="del" onClick={() => setLogs([])}>
						Очистить логи
					</Button>
				</VerticalFlex>
			</Col>
		</Row>
	)
}

export default (Building  )