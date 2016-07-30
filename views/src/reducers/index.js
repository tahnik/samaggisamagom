import { combineReducers } from 'redux';
import { news, news_active, news_pagination } from './news_reducers';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from './auth_reducers';

const rootReducer = combineReducers({
	allNews: news,
	form: formReducer,
	activeNews: news_active,
	authentication: AuthReducer,
	news_pagination: news_pagination
});

export default rootReducer;
