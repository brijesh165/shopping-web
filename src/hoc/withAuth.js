import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
    class Authentication extends Component {
        componentDidMount() {
            const { _userLoggedIn, _role, history } = this.props;

            const { token, currentUser } = JSON.parse(localStorage.getItem('userDetails'));
            if ((_userLoggedIn && _role === "shop") || (token && currentUser.role === "shop")) {
                history.push("/admin-dashboard")
            } else if ((_userLoggedIn && _role === "user") || (token && currentUser.role === "user")) {
                history.push("/user-dashboard")
            } else {
                history.push('/login');
            }
        }



        render() {
            return (
                <>
                    <ComposedComponent />
                </>
            );
        }
    }

    const mapstateToProps = state => ({
        _userLoggedIn: state.users.userLoggedIn,
        _role: state.users.role
    });

    return connect(mapstateToProps, null)(withRouter(Authentication));
}