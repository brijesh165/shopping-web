import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = props => {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("userLoggedIn") && localStorage.getItem("role") === "shop") {
            history.push('/admin-dashboard');
        } else if ((localStorage.getItem("userLoggedIn") && localStorage.getItem("role") === "shop")) {
            history.push('/user-dashboard');
        } else {
            history.push('/');
        }
    }, [localStorage, history]);

    return localStorage.getItem("userLoggedIn");
}

export default useAuth;