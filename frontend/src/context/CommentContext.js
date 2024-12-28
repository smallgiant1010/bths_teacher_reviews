import { useReducer, createContext } from 'react';

export const CommentContext = createContext();

const commentReducer = (state, action) => {
    switch(action.type) {
        case 'SET_COMMENTS':
            return { comments: action.payload };

        case 'CREATE_COMMENT':
            return { comments: [...state.comments, action.payload] };
        
        case 'DELETE_COMMENT':
            return { comments: state.comments.filter((comment) => comment._id !== action.payload._id )};
        
        default:
            return state;
    }
};

export const CommentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentReducer, {
        comments: null,
    });

    return (
        <CommentContext.Provider value={{...state, dispatch}}>
            {children}
        </CommentContext.Provider>
    )
}