
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const mapState = ({ users }) => ({
    userLoggedIn: users.userLoggedIn
});

const useAuth = props => {
    const { userLoggedIn } = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        if (!userLoggedIn) {
            history.push('/');
        }
    }, [userLoggedIn, history]);

    return userLoggedIn;
}

export default useAuth;