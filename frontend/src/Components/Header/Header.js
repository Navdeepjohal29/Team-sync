import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import logo from '../../Images/logo.png';
import './Header.css'
const  Header = ()=> {
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand className="logo" href="/"><img src={logo}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">List Member</Nav.Link>
            <Nav.Link href="/AddMember">Add Member</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
;