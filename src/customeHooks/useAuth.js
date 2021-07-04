import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = props => {
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("userLoggedIn")) {
            history.push('/login');
        }
    }, [localStorage, history]);

    return localStorage.getItem("userLoggedIn");
}

export default useAuth;