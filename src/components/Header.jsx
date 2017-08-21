import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className='header'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Pallid Demo</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Manage</NavItem>
          <NavItem eventKey={2} href="#">Invite</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
export default Header;