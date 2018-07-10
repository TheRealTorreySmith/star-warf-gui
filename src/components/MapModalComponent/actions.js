import request from 'superagent'
const SERVER_URI = 'https://nominatim.openstreetmap.org'

export default {
	onSearch(value) {
		return request.get(`${SERVER_URI}/search/${value}`)
			.query({
				format: 'json',
				addressdetails: 1,
				'accept-language': 'en',
				polygon_geojson: 1
			})
	}
}
