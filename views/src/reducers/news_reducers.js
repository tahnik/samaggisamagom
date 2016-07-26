import { ALL_NEWS } from '../actions/news_actions';

export default function(state=[], action) {
    switch (action.type) {
        case ALL_NEWS:
            return action.payload.data.news;
    }
    return state;
}
