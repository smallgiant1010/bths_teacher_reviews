import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { useAdminContext } from "./useAdminContext";
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: adminDispatch } = useAdminContext();

    const userLogin = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({email, password}),
            credentials: 'include',
        });
        
        const json = response.json();
        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {
            setUser(json);
            authDispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        }
    }

    const adminLogin = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/admin/signin', {
            method: 'POST',
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({username, password}),
            credentials: 'include',
        });
        
        const json = response.json();
        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {
            setUser(json);
            adminDispatch({ type: 'SIGNIN', payload: json });
            setIsLoading(false);
        }
    }

    return {
        error,
        isLoading,
        user,
        userLogin,
        adminLogin,
    }
}
