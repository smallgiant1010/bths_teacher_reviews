import { createContext, useReducer } from "react";

export const TeacherContext = createContext();

const teacherContextReducer = (state, action) => {
    switch(action.type) {
        case "SET_TEACHERS":
            return { teachers: [...action.payload] };
            
        case "REMOVE_TEACHERS":
            return { teachers: [] };

        default:
            return state;
    }
}

export const TeacherContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(teacherContextReducer, {
        teachers: [],
    })

    return <TeacherContext.Provider value={{...state, dispatch}}>
        {children}
    </TeacherContext.Provider>
}