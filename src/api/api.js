import axios from 'axios'
// const gameServerApi = process.env.GAME_SERVER_API
const gameServerApi = "http://dev.fanil.ru:45678"

class Api {
	get({ path, data = {} }, { accessToken }) {
		return axios.get(`${gameServerApi}/${path}`, { headers: { accessToken }, params: data })
	}
	post({ path, data }, { accessToken }) {
		return axios.post(`${gameServerApi}/${path}`, data ? data : {}, { headers: { accessToken } })
	}
	delete({ path, data = {} }, { accessToken }) {
		return axios.delete(`${gameServerApi}/${path}`, { headers: { accessToken }, data })
	}
}

export default new Api()