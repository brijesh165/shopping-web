import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from './../../store/actions/index';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './header.css';

const Header = () => {
    const { currentUser: { username, userLoggedIn } } = JSON.parse(localStorage.getItem("userDetails"));
    const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0
    const [_userLoggedIn, setUserLoggedIn] = useState(userLoggedIn);
    const [_username, setUserName] = useState(username);
    const [itemCount, setItemCount] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setItemCount(cartItems);
        setUserLoggedIn(userLoggedIn);
        setUserName(username);
    }, [cartItems, username, userLoggedIn])

    // function called when user click on logout button
    const _handleLogout = () => {
        dispatch(actions.onLogout());
        history.push("/");
    }

    // function called when user click on cart button
    const _handleCart = () => {
        history.push("/order-cart");
    }

    return (
        <div>
            <Navbar color="light" light>
                <NavbarBrand href="/" className="mr-auto">Web</NavbarBrand>
                {console.log("userLoggedIn: ", _userLoggedIn, _username)}
                {
                    _userLoggedIn &&
                    <Nav navbar className="mr-4 rightMenu">
                        <NavItem className="navitem">
                            <NavLink>{_username}</NavLink>
                        </NavItem>
                        <NavItem className="navitem">
                            <NavLink onClick={_handleCart}>
                                <div className="wrapper">
                                    Cart
                                    {itemCount > 0 && <span>{itemCount}</span>}
                                </div>
                            </NavLink>
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