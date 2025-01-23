import { useCookies } from "react-cookie";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [cookies] = useCookies(['jwt']);
        const loggedIn = cookies.jwt !== null;

        return <WrappedComponent {...props} loggedIn={loggedIn} />;
    }
}

export default withAuth;