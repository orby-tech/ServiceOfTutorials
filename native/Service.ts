import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const API_URL = 'http://api.tutorials.getteam.space';

const storeData = async () => {
	try {
	  const jsonValue = JSON.stringify("value")
	  await AsyncStorage.setItem('@storage_Key', jsonValue)
	} catch (e) {
	  
		console.log(e)
	}
  }
const  getData = async () => {
	try {
	  const value = await AsyncStorage.getItem('@storage_Key')
	  if(value !== null) {
	  }
	} catch(e) {
	  console.log(e)
	}
  }
export default class Service{
	getCatalog() {
		const url = `${API_URL}/allcatalog`;
		console.log(true)
		return axios.get(url).then(response => response.data);
	}
	getArticle(raw:any[]) {
		const url = `${API_URL}/article`;
		return axios.post(url, raw).then(response => response.data[0].article);
	}	
	
	getRedactions() {
		const url = `${API_URL}/redactions`;
		return axios.get(url).then(response => response.data);
	}
	RedactionAppdate(raw:any[]) {
		const url = `${API_URL}/redactionAppdate`;
		return axios.post(url, raw).then(response => response.data);
	}	

	createArticle(raw:any[]) {
		const url = `${API_URL}/createarticle`;
		return axios.post(url, raw).then(response => response.data[0].article);
	}
	goodArticleUpdate (raw:any[]) {
		const url = `${API_URL}/goodArticleUpdate`;
		return axios.post(url, raw).then(response => response);
	}
	badArticleUpdate (raw:any[]) {
		const url = `${API_URL}/badArticleUpdate`;
		return axios.post(url, raw).then(response => response);
	}
	redactorArticle (raw:any[]) {
		const url = `${API_URL}/redactorArticleAppend`;
		return axios.post(url, raw).then(response => response);
	}


	newType (raw:any[]) {
		const url = `${API_URL}/newType`;
		return axios.post(url, raw).then(response => response);
	}	



	getComments(raw:any[]) {
		const url = `${API_URL}/comments`;
		return axios.post(url, raw).then(response => response.data);
	}	
	appendComment(raw:any[]){
		const url = `${API_URL}/appendcomment`;
		console.log("hello")
		return axios.post(url, raw).then(response => response);
	}
	deleteComment(raw:any[]){
		const url = `${API_URL}/deletecomment`;
		return axios.post(url, raw).then(response => response);
	}
}