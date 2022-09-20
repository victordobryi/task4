import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IHeader {
  isAuth: boolean;
}

const Header = ({ isAuth }: IHeader) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">VK-app</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!isAuth ? (
            <Nav className="ms-auto">
              <Nav.Link>
                <Link to="/signup">SignUp</Link>
              </Nav.Link>
              <Nav.Link eventKey={2} href="/login">
                <Link to="/login">LogIn</Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link>
                <Link to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link eventKey={2} href="/login">
                <Link to="/main">LogOut</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
