import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { userLogout } from '../../store/reducers/auth/ActionCreator';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>VK-app</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!isAuth ? (
            <Nav className="ms-auto">
              <LinkContainer to="/signup">
                <Nav.Link>SignUp</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link eventKey={2}>LogIn</Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/main">
                <Nav.Link eventKey={2} onClick={() => dispatch(userLogout())}>
                  LogOut
                </Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
