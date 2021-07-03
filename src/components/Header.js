import React from "react";
import { Link } from "react-router-dom"
import {Navbar, Nav} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

  return (
  //   <div className="nav">
  //     <div className="nav-item"><span className="nav-logo"><Link to="/">Template</Link></span></div>
  //     <div className="nav-item"><Link to="/weathers">Weather Data</Link></div>
  //     <div className="nav-item"><Link to="/about">About</Link></div>
  //  </div>

    <>
    `<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Singapore's Weather Data</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>`
    </>
  );
}

export default Header
