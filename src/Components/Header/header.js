import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from './../../store/actions/index';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './header.css';

const Header = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [username, setUserName] = useState("");
    const [itemCount, setItemCount] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const count = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0;
        setItemCount(count);
        setUserLoggedIn(localStorage.getItem("userLoggedIn"));
        setUserName(localStorage.getItem("userName"));
    }, [localStorage.getItem("cartItems"),
    localStorage.getItem("username"),
    localStorage.getItem("userLoggedIn")])

    const _handleLogout = () => {
        dispatch(actions.onLogout());
        history.push("/");
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