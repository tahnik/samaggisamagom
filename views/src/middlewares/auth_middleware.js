import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGN_IN, SIGN_OUT, SIGN_UP, AUTH_LOADING } from '../actions/auth_actions';
import { browserHistory } from 'react-router';

export default function({ dispatch }) {
	return next => action => {
		// If action does not have payload
		// or, the payload does not have a .then property
		// we dont care about it, send it on
		if (!action.payload || !action.payload.then || (action.type != SIGN_IN && action.type != SIGN_UP)) {
			return next(action);
		}

		dispatch({
			type: AUTH_LOADING,
			loading: true
		})
		// Make sure the action's promise resolves
		action.payload
		.then(function(response) {
			dispatch({
				type: AUTH_LOADING,
				loading: false
			})
			// create a new action with the old type, but
			// replace the promise with the reponse data
			if(action.type == SIGN_IN){
				if(!response.data.success){
					dispatch({
						type: AUTH_ERROR,
						payload: "Sign in unsuccessful"
					});
					return;
				}
				dispatch({
					type: AUTH_USER,
					payload: response,
					role: response.data.role,
					error: 0
				});
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('role', response.data.role);
				browserHistory.push('/');
			}else if (action.type == SIGN_UP) {
				if(!response.data.success){
					dispatch({
						type: AUTH_ERROR,
						payload: "Sign up unsuccessful"
					});
					return;
				}
				dispatch({
					type: AUTH_USER,
					payload: response,
					role: response.data.role,
					error: 0
				});
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('role', response.data.role);
				browserHistory.push('/');
			}else {
				const newAction = { ...action, payload: response };
				dispatch(newAction);
			}
		})
		.catch(function(e){
			dispatch({
				type: AUTH_ERROR,
				payload: e
			})
			dispatch({
				type: AUTH_LOADING,
				loading: false
			})
		})
	}
}
