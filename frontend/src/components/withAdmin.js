import { useCookies } from "react-cookie";

const withAdmin = (WrappedComponent) => {
    return (props) => {
        const [cookies] = useCookies(['adminToken']);

        return <WrappedComponent {...props} />;
    }
}

export default withAdmin;