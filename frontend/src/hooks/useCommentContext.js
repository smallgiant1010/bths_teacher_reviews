import { useContext } from "react";
import { CommentContext } from "../context/CommentContext";

export const useCommentContext = () => {
    const context = useContext(CommentContext);

    if(!context) {
        throw Error('AuthContext must be used within an AuthContextProvider');
    }

    return context;
}