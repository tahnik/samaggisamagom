import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/auth_actions';

export default function(state={}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, role: action.role };
        case UNAUTH_USER:
            return { ...state, authenticated: false, role: 0 };
        case AUTH_ERROR:
            return { ...state, error: action.payload };

    }
    return state;
}
