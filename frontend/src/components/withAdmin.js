import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"

const withAdmin = (WrappedComponent) => {
    return (props) => {
        const [cookies] = useCookies(['adminToken']);
        const navigate = useNavigate();

        useEffect(() => {
            if(!cookies.adminToken) {
                navigate('/login');
            }
        }, [cookies.adminToken, navigate]);

        if(!cookies.adminToken) {
            return null;
        }

        return <WrappedComponent {...props} />;
    }
}

export default withAdmin;