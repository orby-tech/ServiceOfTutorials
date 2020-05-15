import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';
const token = {headers: { Authorization: `JWT ${localStorage.getItem('token')}`}};

export default class Service{
	getCatalog() {
		const url = `${API_URL}/allcatalog`;
		return axios.get(url).then(response => response.data);
	}
	getArticle(raw) {
		const url = `${API_URL}/article`;
		return axios.post(url, raw).then(response => response.data[0].article);
	}
}