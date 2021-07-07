import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as actions from './../../store/actions/index';
import i18n from '../../i18n';

import {
    Navbar, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import './header.css';

const Header = (props) => {
    const { currentUser: { username, userLoggedIn, language } } = JSON.parse(localStorage.getItem("userDetails"));
    // const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0
    const [_userLoggedIn, setUserLoggedIn] = useState(userLoggedIn);
    const [_username, setUserName] = useState(username);
    const [itemCount, setItemCount] = useState(0);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        i18n.changeLanguage(language);
        setItemCount(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0);
        setUserLoggedIn(userLoggedIn);
        setUserName(username);
    }, [username, userLoggedIn, localStorage.getItem("cartItems")])

    // function called when user click on logout button
    const _handleLogout = () => {
        dispatch(actions.onLogout());
        history.push("/");
    }

    // function called when user click on cart button
    const _handleCart = () => {
        history.push("/order-cart");
    }

    const _handleLanguageEnglish = () => {
        i18n.changeLanguage("en");
    }

    const _handleLanguageSpanish = () => {
        i18n.changeLanguage("el");
    }

    return (
        <div>
            <Navbar color="light" light>
                <NavbarBrand href="/" className="mr-auto">Web</NavbarBrand>
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
                        <UncontrolledDropdown setActiveFromChild className="navitem">
                            <DropdownToggle tag="a" className="nav-link" caret>
                                Language
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem active onClick={_handleLanguageEnglish}>English</DropdownItem>
                                <DropdownItem onClick={_handleLanguageSpanish}>Spanish</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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