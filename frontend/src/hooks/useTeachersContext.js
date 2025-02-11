import { useContext } from "react";
import { TeacherContext } from "../context/TeachersContext";

export const useTeachersContext = () => {
    const teachersContext = useContext(TeacherContext);
    
    return teachersContext;
}