import axios from 'axios';
import { ROOT_URL_SECURE } from '../root_url';

export const ALL_NEWS = 'ALL_NEWS';
export const CREATE_POST = 'CREATE_POST';
export const ACTIVE_NEWS = 'ACTIVE_NEWS';


export function getAllNews() {
    const url = `${ROOT_URL_SECURE}/api/news`;

    const request = axios.get(url);

    return{
        type: ALL_NEWS,
        payload: request
    }
}

export function createPost(props) {
    const url = `${ROOT_URL_SECURE}/api/news`;

    var body = new FormData();
    Object.keys(props).forEach(( key ) => {
        if(key == "news_image"){
            body.append(key, props[key][0]);
        }else {
            body.append(key, props[ key ]);
        }
    });

    var request = axios.post(url, body);

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function getNews(id) {
    const url = `${ROOT_URL_SECURE}/api/news/${id}`;

    const request = axios.get(url);

    return{
        type: ACTIVE_NEWS,
        payload: request
    }
}
