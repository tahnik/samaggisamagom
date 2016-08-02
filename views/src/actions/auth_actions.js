import axios from 'axios';
import { ROOT_URL_SECURE } from '../root_url';
import { browserHistory } from 'react-router';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTH_LOADING = 'AUTH_LOADING';

// export function checkLocalAuth() {
// 	return function(dispatch) {
// 		var token = localStorage.getItem("token");
// 		if(token) {
// 			const url = `${ROOT_URL_SECURE}/api/verifyToken`;
//
// 			var params = {
// 				token: token
// 			}
//
// 			axios.post(url, params)
// 			.then(response => {
// 				if(!response.data.success){
// 					localStorage.removeItem("token");
// 					return;
// 				}
// 				dispatch({
// 					type: AUTH_USER,
// 					payload: response
// 				});
// 			})
// 			.catch(() => {
// 				dispatch(authError('Bad Login Info'));
// 			});
// 		}
// 	}
// }

export function signin(props) {
	const url = `${ROOT_URL_SECURE}/api/signin`;

	var params = {
		email: props.email,
		password: props.password,
		expiresIn: '10h'
	}

	var request = axios.post(url, params)

	return {
		type: SIGN_IN,
		payload: request
	}
}

export function signup(props) {
	const url = `${ROOT_URL_SECURE}/api/signup`;

	var params = {
		email: props.email,
		password: props.password,
		expiresIn: '10h'
	}

	var request = axios.post(url, params)

	return {
		type: SIGN_UP,
		payload: request
	}
}

export function signout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');

  return { type: UNAUTH_USER };
}
