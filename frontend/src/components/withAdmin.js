import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom"

const withAdmin = (WrappedComponent) => {
    return (props) => {
        const [cookies] = useCookies(['adminToken']);
        const history = useHistory();

        if(!cookies.adminToken) {
            history.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    }
}

export default withAdmin;