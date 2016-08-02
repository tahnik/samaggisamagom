import axios from 'axios';
import { ROOT_URL_SECURE } from '../root_url';
import { browserHistory } from 'react-router';

export const PAGE_NEWS = 'PAGE_NEWS';
export const TOP_NEWS = 'TOP_NEWS';
export const CREATE_POST = 'CREATE_POST';
export const ACTIVE_NEWS = 'ACTIVE_NEWS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const PAGINATION_NEWS = 'PAGINATION_NEWS';
export const GET_NEWS_WITH_PAGE = 'GET_NEWS_WITH_PAGE';


export function getNewsWithPage(page) {
	const url = `${ROOT_URL_SECURE}/api/news?page=${page}`;

	var request = axios.get(url);
	return {
		type: GET_NEWS_WITH_PAGE,
		payload: request,
		page: page
	}
}

export function getTopNews() {
	const url = `${ROOT_URL_SECURE}/api/news/top`;

	var request = axios.get(url);
	return({
		type: TOP_NEWS,
		payload: response
	})
}

export function createPost(props) {
	const url = `${ROOT_URL_SECURE}/api/news`;

	var body = new FormData();
	Object.keys(props).forEach(( key ) => {
		if(key == "news_image"){
			body.append(key, props[key][0]);
		}else {
			body.append(key, props[ key ]);
		}
	});
	body.append('token', localStorage.getItem('token'));


	var request = axios.post(url, body);
	return({
		type: CREATE_POST,
		payload: request
	})
}

export function getNews(id) {
	const url = `${ROOT_URL_SECURE}/api/news/${id}`;

	var request = axios.get(url);
	return({
		type: ACTIVE_NEWS,
		payload: request
	})
}


//This function is used to destroy the current active news item.
//Without this a single news page will show the previous news for a split second and re render
export function destroyActiveNews() {
	var response = {
		data: {
			news: null
		}
	}
	return({
		type: ACTIVE_NEWS,
		payload: response
	})
}
