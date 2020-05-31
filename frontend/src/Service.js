import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class Service{
	getCatalog() {
		const url = `${API_URL}/allcatalog`;
		return axios.get(url).then(response => response.data);
	}
	getArticle(raw) {
		const url = `${API_URL}/article`;
		return axios.post(url, raw).then(response => response.data);
	}	
	
	getRedactions() {
		const url = `${API_URL}/redactions`;
		return axios.get(url).then(response => response.data);
	}
	RedactionAppdate(raw) {
		const url = `${API_URL}/redactionAppdate`;
		return axios.post(url, raw).then(response => response.data);
	}	

	createArticle(raw) {
		const url = `${API_URL}/createarticle`;
		return axios.post(url, raw).then(response => response.data[0].article);
	}
	goodArticleUpdate (raw) {
		const url = `${API_URL}/goodArticleUpdate`;
		return axios.post(url, raw).then(response => response);
	}
	badArticleUpdate (raw) {
		const url = `${API_URL}/badArticleUpdate`;
		return axios.post(url, raw).then(response => response);
	}
	redactorArticle (raw) {
		const url = `${API_URL}/redactorArticleAppend`;
		return axios.post(url, raw).then(response => response);
	}


	newType (raw) {
		const url = `${API_URL}/newType`;
		return axios.post(url, raw).then(response => response);
	}	



	getComments(raw) {
		const url = `${API_URL}/comments`;
		return axios.post(url, raw).then(response => response.data);
	}	
	appendComment(raw){
		const url = `${API_URL}/appendcomment`;
		console.log("hello")
		return axios.post(url, raw).then(response => response);
	}
	deleteComment(raw){
		const url = `${API_URL}/deletecomment`;
		return axios.post(url, raw).then(response => response);
	}
}