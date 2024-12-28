import { createContext, useEffect, useReducer } from "react";
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
    });

    useEffect(() => {
        const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
        const token = cookies.jwt;
        if(token) {
            dispatch({type: 'LOGIN', payload: token});
        }
    });

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}