import { useContext } from "react";
import { TeacherContext } from "../context/TeachersContext";

export const useTeacherContext = () => {
    const teachersContext = useContext(TeacherContext);

    return teachersContext;
}