import { PAGE_NEWS, TOP_NEWS, ACTIVE_NEWS, PAGINATION_NEWS, CREATE_POST } from '../actions/news_actions';

export function news(state=[], action) {
    switch (action.type) {
        case PAGE_NEWS:
            return action.payload.data.news;
        case TOP_NEWS:
            return action.payload.data.news;
    }
    return state;
}


export function news_active(state=null, action) {
    switch (action.type) {
        case ACTIVE_NEWS:
            return action.payload.data.news;
    }
    return state;
}

export function news_pagination(state={page: null, maxNews: 10, maxPage: 10}, action) {
    switch (action.type) {
        case PAGINATION_NEWS:
            return {
                page: action.page,
                maxNews: action.payload.data.maxNews,
                maxPage: action.payload.data.maxPage
            };
    }
    return state;
}

export function create_news(state={loading: false}, action) {
    switch(action.type) {
        case CREATE_POST:
            return { loading: action.loading, error: action.error }
    }
    return state;
}
