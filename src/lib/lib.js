export const parseForm = (e, keys) => {
	e.preventDefault()
	let data = {}
	keys.forEach((key) => data[key] = ['x', 'y', 'id'].includes(key) ? Number(e.target[key].value) : e.target[key].value)
	return data
}