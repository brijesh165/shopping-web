import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
    class Authentication extends Component {
        componentDidMount() {
            console.log("With Auth: component Did Mount")
            const { _userLoggedIn, _role, history } = this.props;

            const { token, currentUser } = JSON.parse(localStorage.getItem('userDetails'));
            if ((_userLoggedIn && _role === "shop") || (token && currentUser.role === "shop")) {
                console.log("Admin Dashboard")
                history.push("/admin-dashboard")
            } else if ((_userLoggedIn && _role === "user") || (token && currentUser.role === "user")) {
                console.log("User Dashboard")
                history.push("/user-dashboard")
            } else {
                console.log("login")
                history.push('/login');
            }
        }

        render() {
            console.log("With Auth: Render")
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