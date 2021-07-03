import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from './../../store/actions/index';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './header.css';

const mapState = ({ users }) => ({
    userLoggedIn: users.userLoggedIn,
    username: users.username
})

const Header = () => {
    const { userLoggedIn, username } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!userLoggedIn) {
            history.push("/")
        }
    }, [userLoggedIn, history])

    const _handleLogout = () => {
        dispatch(actions.logout());
    }

    const _handleCart = () => {
        history.push("/order-cart");
    }

    return (
        <div>
            <Navbar color="light" light>
                <NavbarBrand href="/" className="mr-auto">Web</NavbarBrand>
                {
                    userLoggedIn &&
                    <Nav navbar className="mr-4 rightMenu">
                        <NavItem className="navitem">
                            <NavLink>{username}</NavLink>
                        </NavItem>
                        <NavItem className="navitem">
                            <NavLink onClick={_handleCart}>Cart</NavLink>
                        </NavItem>
                        <NavItem className="navitem">
                            <NavLink onClick={_handleLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                }
            </Navbar>
        </div>
    )
}

export default Header;