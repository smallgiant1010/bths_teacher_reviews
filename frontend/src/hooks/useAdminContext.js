import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";

export const useAdminContext = () => {
    const adminContext = useContext(AdminContext);

    if(!adminContext) {
        throw Error("AdminContext can only be used within a AdminContextProvider");
    }

    return adminContext;
}