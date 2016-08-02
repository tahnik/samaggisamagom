import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/auth_actions';
import { PAGE_NEWS, TOP_NEWS, ACTIVE_NEWS, PAGINATION_NEWS, GET_NEWS_WITH_PAGE, CREATE_POST } from '../actions/news_actions';
import { browserHistory } from 'react-router';

export default function({ dispatch }) {
	return next => action => {
		// If action does not have payload
		// or, the payload does not have a .then property
		// we dont care about it, send it on
		if (!action.payload || !action.payload.then || action.type == AUTH_USER || action.type == UNAUTH_USER) {
			return next(action);
		}

		dispatch({
			type: CREATE_POST,
			loading: true
		})

		// Make sure the action's promise resolves
		action.payload
		.then(function(response) {
			dispatch({
				type: CREATE_POST,
				loading: false
			})
			// create a new action with the old type, but
			// replace the promise with the reponse data
			if(action.type == GET_NEWS_WITH_PAGE) {
				dispatch({
					type: PAGE_NEWS,
					payload: response
				})
				dispatch({
					type: PAGINATION_NEWS,
					payload: response,
					page: action.page,
				})
			}else if(action.type == CREATE_POST){
				const newAction = { ...action, payload: response };
				dispatch(newAction);
				browserHistory.push('/');
			}else {
				const newAction = { ...action, payload: response };
				dispatch(newAction);
			}
		});
	}
}
