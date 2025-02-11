import { useAuthContext } from "./useAuthContext";
import { useAdminContext } from "./useAdminContext";
import { useCookies } from "react-cookie";

export const useLogout = () => {
    const { state: authState, dispatch: authDispatch } = useAuthContext();
    const { state: adminState, dispatch: adminDispatch } = useAdminContext();
    const [, , removeCookie] = useCookies(['jwt', 'adminToken'])

    const logout = () => {
        if(authState.user) {
            removeCookie('jwt');
            authDispatch({ type:'LOGOUT',});
        }
        else if (adminState.user) {
            removeCookie('adminToken');
            adminDispatch({ type: 'SIGNOUT',});
        }
    }

    return { logout };
}