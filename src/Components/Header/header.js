import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './header.css';

const mapState = ({ users }) => ({
    userLoggedIn: users.userLoggedIn,
    username: users.username
})

const Header = () => {
    const { userLoggedIn, username } = useSelector(mapState);
    const dispatch = useDispatch();

    const _handleLogout = () => {
        dispatch();
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
                            <NavLink onClick={_handleLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                }
            </Navbar>
        </div>
    )
}

export default Header;