export const parseForm = (e, keys) => {
	e.preventDefault()
	let data = {}
	keys.forEach((key) => data[key] = ['x', 'y', 'id'].includes(key) ? Number(e.target[key].value) : e.target[key].value)
	return data
}
export const isEmpty = (obj) => {
	return obj === null || obj === undefined || obj === 0 || obj === "" || (Array.isArray(obj) && !obj.length) || !Object.keys(obj).length ? true : false
}