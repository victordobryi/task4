import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../store/reducers/auth';
import { LinkContainer } from 'react-router-bootstrap';

interface IHeader {
  isAuth: boolean;
}

const Header = ({ isAuth }: IHeader) => {
  const dispatch = useDispatch();
  const { changeIsAuth } = authSlice.actions;

  const handleLogout = () => {
    dispatch(changeIsAuth(false));
  };

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
                <Nav.Link eventKey={2} onClick={handleLogout}>
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
