import React, { Component } from "react"
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Header extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Job Ads Checkout System</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/">
                        Checkout
                    </NavItem>
                    <NavItem eventKey={2} href="/rules">
                        Rules Management
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Header
