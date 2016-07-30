import axios from 'axios';
import { ROOT_URL_SECURE } from '../root_url';
import { browserHistory } from 'react-router';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export function signin(props) {
	return function(dispatch){
		const url = `${ROOT_URL_SECURE}/api/signin`;

		//to send data as application/x-www-form-urlencoded
		var params = new URLSearchParams();
		params.append('email', props.email);
		params.append('password', props.password);
		params.append('expiresIn', '10h');

		axios.post(url, params)
		.then(response => {
			if(!response.data.success){
				dispatch(authError('Bad Login Info'));
				return;
			}
			dispatch({
				type: AUTH_USER,
				payload: response
			});
			localStorage.setItem('token', response.data.token);
			browserHistory.push('/');
		})
		.catch(() => {
			dispatch(authError('Bad Login Info'));
		});


	}
}

export function signup(props) {
	return function(dispatch){
		const url = `${ROOT_URL_SECURE}/api/signup`;

		//to send data as application/x-www-form-urlencoded
		var params = new URLSearchParams();
		params.append('email', props.email);
		params.append('password', props.password);
		params.append('expiresIn', '10h');

		axios.post(url, params)
		.then(response => {
			if(!response.data.success){
				dispatch(authError('Bad Login Info'));
				return;
			}
			dispatch({
				type: AUTH_USER,
				payload: response
			});
			localStorage.setItem('token', response.data.token);
			browserHistory.push('/');
		})
		.catch(() => {
			dispatch(authError('Bad Login Info'));
		});


	}
}

export function signout() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}


export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}
