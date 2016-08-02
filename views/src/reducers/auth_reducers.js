import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_LOADING } from '../actions/auth_actions';

export default function(state={loading: false, error: 0}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, role: action.role, error: 0 };
        case UNAUTH_USER:
            return { ...state, authenticated: false, role: 0 };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case AUTH_LOADING:
            return { ...state, loading: action.loading }
    }
    return state;
}
