import { useState } from "react";
import { useAuthContext } from './useAuthContext';
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/auth/signup', {
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
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        }
    }

    return {
        error,
        isLoading,
        user,
        signup
    }
}
