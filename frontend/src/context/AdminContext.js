import { useReducer, createContext, useEffect } from "react";

export const AdminContext = createContext();

const AdminReducer = (state, action) => {
    switch(action.type) {
        case 'SIGNIN':
            return { user: action.payload[0], users: action.payload[1]};
        case 'SIGNOUT':
            return { user: null, users: null };
        case 'BAN_USER':
            return { user: state, users: state.users.filter((client) => client._id !== action.payload._id )};
        case 'UNBAN_USER':
            return { user: state, users: [...state, action.payload]};
        default:
            return state;
    }
}

export const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AdminReducer, {
        user: null,
        users: null,
    });

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
            const token = getCookie('adminToken');
            if(token) {
                dispatch({ type: 'SIGNIN', payload: token});
            }
        }, [dispatch]);
    
    return (
        <AdminContext.Provider value={{...state, dispatch}}>
            {children}
        </AdminContext.Provider>
    )
}