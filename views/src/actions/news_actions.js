import axios from 'axios';
import { ROOT_URL_SECURE } from '../root_url';
import { browserHistory } from 'react-router';

export const PAGE_NEWS = 'PAGE_NEWS';
export const TOP_NEWS = 'TOP_NEWS';
export const CREATE_POST = 'CREATE_POST';
export const ACTIVE_NEWS = 'ACTIVE_NEWS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const PAGINATION_NEWS = 'PAGINATION_NEWS';


export function getNewsWithPage(page) {
	return function(dispatch){
		const url = `${ROOT_URL_SECURE}/api/news?page=${page}`;

		axios.get(url)
		.then(response => {
			dispatch({
				type: PAGE_NEWS,
				payload: response
			})
			dispatch({
				type: PAGINATION_NEWS,
				payload: response,
				page: page,
			})
		})
		.catch(() => {
			dispatch(authError('Bad Login Info'));
		});
	}
}

export function getTopNews() {
	return function(dispatch){
		const url = `${ROOT_URL_SECURE}/api/news/top`;

		axios.get(url)
		.then(response => {
			dispatch({
				type: TOP_NEWS,
				payload: response
			})
		})
		.catch(() => {
			dispatch(authError('Bad Login Info'));
		});
	}
}

export function createPost(props) {
	return function(dispatch){
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


		axios.post(url, body)
		.then(response => {
			dispatch({
				type: CREATE_POST,
				payload: response
			});
			browserHistory.push('/');
		})
		.catch(() => {
			dispatch(authError('Bad Login Info'));
		});


	}
}

export function getNews(id) {
	return function(dispatch){
		const url = `${ROOT_URL_SECURE}/api/news/${id}`;

		axios.get(url)
		.then(response => {
			dispatch({
				type: ACTIVE_NEWS,
				payload: response
			})
		})
		.catch(() => {
			dispatch(authError('Bad Login Info'));
		});
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}
