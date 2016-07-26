import { ACTIVE_NEWS } from '../actions/news_actions';

export default function(state=null, action) {
    switch (action.type) {
        case ACTIVE_NEWS:
            return action.payload.data.news;
    }
    return state;
}
