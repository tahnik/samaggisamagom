import { combineReducers } from 'redux';
import { news, news_active, news_pagination, create_news } from './news_reducers';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from './auth_reducers';

const rootReducer = combineReducers({
	allNews: news,
	form: formReducer,
	activeNews: news_active,
	authentication: AuthReducer,
	news_pagination: news_pagination,
	create_news: create_news
});

export default rootReducer;
