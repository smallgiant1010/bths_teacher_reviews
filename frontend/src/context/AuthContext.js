import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const AuthReducer = (state, action) => {

};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
    });

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}