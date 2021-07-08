import {Navbar, Nav} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

  return (

    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/station">Choose Weather Station</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>`
    </>
  );
}

export default Header
