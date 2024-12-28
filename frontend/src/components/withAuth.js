import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [cookies] = useCookies(['jwt']);
        const history = useHistory();

        if(!cookies.jwt) {
            history.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    }
}

export default withAuth;