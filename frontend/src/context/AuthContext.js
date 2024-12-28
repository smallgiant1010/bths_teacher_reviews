import { createContext, useEffect, useReducer } from "react";

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

    // Not a react component so can't use react-cookie
    // Auto login if cookie already exists
    useEffect(() => {
        const getCookie = (name) => {
            const cookies = document.cookie.split(";");
            for(let i = 0;i < cookies.length;i++) {
                const [key, value] = cookies[i].split("=");
                if(key === name) {
                    return decodeURIComponent(value);
                }
            }
            return null;
        }
        const token = getCookie('jwt');
        if(token) {
            dispatch({ type: 'LOGIN', payload: token});
        }
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}