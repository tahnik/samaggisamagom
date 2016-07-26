import { combineReducers } from 'redux';
import NewsReducer from './news_reducers';
import ActiveNews from './news_active_reducers';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
	allNews: NewsReducer,
	form: formReducer,
	activeNews: ActiveNews
});

export default rootReducer;
