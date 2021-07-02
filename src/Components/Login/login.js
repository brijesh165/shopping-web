import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Label, Col, Button } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';

import './login.css';
import * as actions from './../../store/actions/index';

const mapState = ({ users }) => ({
    _userLoggedIn: users.userLoggedIn,
    _loginError: users.loginError
})

const Login = () => {
    const { _userLoggedIn, _loginError } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (_userLoggedIn) {
            history.push("/products");
            _handleFormReset()
        }
    }, [_userLoggedIn, history])

    const _handleFormReset = () => {
        setUsername('');
        setPassword('');
    }

    const _handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.onLogin({ username: username, password: password }))
    }

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h3>Login Form</h3>
                {_loginError &&
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'red' }}>{_loginError}</p>
                    </div>
                }
                <AvForm className="loginForm" onValidSubmit={_handleFormSubmit}>
                    <AvGroup row>
                        <Label lg={4}>User Name</Label>
                        <Col lg={8}>
                            <AvField
                                name="username"
                                type="text"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                validate={{
                                    required: { value: true, errorMessage: "Please enter user name." }
                                }}
                            />
                        </Col>
                    </AvGroup>
                    <AvGroup row>
                        <Label lg={4}>Password</Label>
                        <Col lg={8}>
                            <AvField
                                name="password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                validate={{
                                    required: { value: true, errorMessage: "Please enter password." }
                                }}
                            />
                        </Col>
                    </AvGroup>
                    <AvGroup row>
                        <Button color="primary" style={{ margin: "0 auto" }}>Login</Button>
                    </AvGroup>
                </AvForm>
            </div>
        </div>
    )
}

export default Login;