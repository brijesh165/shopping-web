import useAuth from './../customeHooks/useAuth';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;